import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProductsTable1639497391932 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        await queryRunner.createTable(new Table({
            name: 'products',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()',
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'category',
                    type: 'varchar',
                },
                {
                    name: 'brand',
                    type: 'varchar',
                },
                {
                    name: 'provider',
                    type: 'varchar',
                },
                {
                    name: 'quantity',
                    type: 'varchar',
                },
                {
                    name: 'perishable',
                    type: 'boolean',
                },
                {
                    name: 'expiration',
                    type: 'date',
                },
                {
                    name: 'note',
                    type: 'varchar',
                },
                {
                    name: 'price',
                    type: 'varchar',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }

}
