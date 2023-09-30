import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTokenTable1694963929253 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tokens',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: `uuid_generate_v4()`,
          },
          {
            name: 'user_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'token',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'type',
            type: 'enum',
            enum: ['VERIFY_ACCOUNT', 'FORGOT_PASSWORD'],
            default: `'VERIFY_ACCOUNT'`,
          },
          {
            name: 'created_at',
            type: 'varchar',
            default: `CURRENT_TIMESTAMP`,
          },
          {
            name: 'updated_at',
            type: 'varchar',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tokens');
  }
}
