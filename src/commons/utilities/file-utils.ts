import {
  ATTACHMENT_MAX_SIZE,
  AVATAR_MAX_SIZE,
  CLIENT_FILE_MAX_SIZE,
  FILE_MESSAGE_MAX_SIZE,
} from '@constants/constants';
import { BadRequestException } from '@nestjs/common';
import { config, S3 } from 'aws-sdk';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import s3Config from '@configs/s3.config';

export const avatarFilterUpload = (_req, file, callback) => {
  if (!isImage(file.mimetype)) {
    return callback(new BadRequestException('File format not allowed.'), false);
  }

  return callback(null, true);
};

export const homeworkActivityFile = (_req, file, callback) => {
  if (!isImage(file.mimetype) && !isVideo(file.mimetype)) {
    return callback(new BadRequestException('File format not allowed.'), false);
  }

  return callback(null, true);
};

export const avatarInterceptor = (): MulterOptions => ({
  fileFilter: avatarFilterUpload,
  limits: { fileSize: AVATAR_MAX_SIZE },
});

export const homeworkActivityFileInterceptor = (): MulterOptions => ({
  fileFilter: homeworkActivityFile,
});

export const isImage = (type) =>
  type?.match(/(\/|\.)(jpg|jpeg|png|svg|heic)$/gi);

export const isVideo = (type) =>
  type?.match(
    /(\/|\.)(webm|mp4|ogg|mov|quicktime|m4v|3gpp|3gpp2|avchd|hevc)$/gi,
  );

export const createS3URL = (file): string => {
  try {
    config.update({
      accessKeyId: s3Config.accessKey,
      secretAccessKey: s3Config.secretKey,
      region: s3Config.region,
    });

    const s3 = new S3();
    const signedUrlExpireSeconds = 60 * 5;
    const url = s3.getSignedUrl('getObject', {
      Bucket: s3Config.bucketName.replace('/', ''),
      Key: file,
      Expires: signedUrlExpireSeconds,
    });

    return url;
  } catch (e) {
    return `${process.env.BASE_URL}/assets/images/default-avatar.png`;
  }
};

export const messageFilterUpload = (req, file, callback) => {
  if (
    !file.originalname
      .toLowerCase()
      .match(/\.(jpg|jpeg|png|mp4|avi|mov|csv|xls|xlsx)/)
  ) {
    return callback(new BadRequestException('File format not allowed.'), false);
  }
  return callback(null, true);
};

export const messageInterceptor = (): MulterOptions => ({
  fileFilter: messageFilterUpload,
  limits: { fileSize: FILE_MESSAGE_MAX_SIZE },
});

export const clientFileFilterUpload = (_req, file, callback) => {
  if (
    !file.originalname
      ?.toLowerCase()
      .match(/(\/|\.)(doc|docx|csv|xls|xlsx|pdf|jpg|jpeg|png|mp4|mov)$/gi)
  ) {
    return callback(new BadRequestException('File format not allowed.'), false);
  }

  return callback(null, true);
};

export const clientFileInterceptor = (): MulterOptions => ({
  fileFilter: clientFileFilterUpload,
  limits: { fileSize: CLIENT_FILE_MAX_SIZE },
});

export const fileInterceptor = (): MulterOptions => ({
  fileFilter: clientFileFilterUpload,
  // limits: { fileSize:  },
});

export const attachmentContactHelpInterceptor = (): MulterOptions => ({
  fileFilter: (_req, file, callback) => {
    if (
      !file.originalname
        .toLowerCase()
        .match(/\.(jpg|jpeg|png|heic|mp4|mov|csv|xls|xlsx|doc|docx|pdf)/)
    ) {
      return callback(
        new BadRequestException('File format not allowed.'),
        false,
      );
    }

    return callback(null, true);
  },
  limits: { fileSize: ATTACHMENT_MAX_SIZE },
});
