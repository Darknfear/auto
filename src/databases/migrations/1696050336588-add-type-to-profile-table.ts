import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddTypeToProfileTable1696050336588 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'profiles',
      new TableColumn({
        name: 'type',
        type: 'enum',
        enum: ['GOOGLE', 'EMAIL'],
        default: `'EMAIL'`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('profiles', 'type');
  }
}
