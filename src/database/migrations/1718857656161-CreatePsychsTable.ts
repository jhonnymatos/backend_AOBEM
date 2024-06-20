import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreatePsychsTable1718857656161 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'psychs',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        generationStrategy: 'increment'
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        length: '100',
                        isNullable: false
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                        length: '100',
                        isNullable: false 
                    },
                    {
                        name: 'confirmPassword',
                        type: 'varchar',
                        length: '100',
                        isNullable: false 
                    },
                    {
                        name: 'phone',
                        type: 'varchar',
                        length: '100',
                        isNullable: false 
                    },
                    {
                        name: 'crp',
                        type: 'varchar',
                        length: '100',
                        isNullable: false 
                    },
                    {
                        name: 'estado',
                        type: 'varchar',
                        length: '100',
                        isNullable: false 
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('psychs')
    }

}