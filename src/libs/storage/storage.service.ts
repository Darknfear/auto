import s3Config from '@configs/s3.config';
import { Injectable } from '@nestjs/common';
import { config, S3 } from 'aws-sdk';
import { v4 } from 'uuid';

@Injectable()
export class StorageService {
  constructor() {
    config.update({
      accessKeyId: s3Config.accessKey,
      secretAccessKey: s3Config.secretKey,
      region: s3Config.region,
    });
  }

  async singleUpload(
    file: { buffer: Buffer; mimetype: string; originalname: string },
    path?: string,
  ) {
    const uniqueId = v4();
    const s3 = new S3();
    const bucketName = path ? s3Config.bucketName + path : s3Config.bucketName;
    const uploadResult = await s3
      .upload({
        Bucket: bucketName,
        Body: file.buffer,
        ContentType: file.mimetype,
        Key: `${uniqueId}-${file.originalname}`,
      })
      .promise();

    return {
      url: uploadResult.Location,
      key: uploadResult.Key,
      bucket: uploadResult.Bucket,
      file,
    };
  }

  async multiUpload(
    files: Array<Express.Multer.File>,
    path?: string,
  ): Promise<
    {
      url: string;
      key: string;
      bucket: string;
      file: { buffer: Buffer; mimetype: string; originalname: string };
    }[]
  > {
    return await Promise.all(
      files.map((file) => this.singleUpload(file, path)),
    );
  }
}
