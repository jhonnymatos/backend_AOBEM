import { MigrationInterface, QueryRunner, Table, TableForeignKey  } from "typeorm"

export class CreateEvaluationTable1718928082688 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'evaluation',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                      },
                    {
                        name: 'rating',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'review',
                        type: 'varchar',
                        length: '100',
                        isNullable: false 
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false  
                    },
                    {
                        name: 'userId',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'psychId',
                        type: 'int',
                        isNullable: false
                    }
                ]
            })
        );
        await queryRunner.createForeignKey(
            'evaluation',
            new TableForeignKey({
                columnNames: ['userId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE'
            })
        );

        const table = await queryRunner.getTable('evaluation');
        if (table) {
            await queryRunner.createForeignKey(
                'evaluation',
                new TableForeignKey({
                    columnNames: ['userId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'user',
                    onDelete: 'CASCADE'
                })
            );

            await queryRunner.createForeignKey(
                'evaluation',
                new TableForeignKey({
                    columnNames: ['psychId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'psych',
                    onDelete: 'CASCADE'
                })
            );
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('evaluation');
        if (table) {
            const foreignKeys = table.foreignKeys.filter(fk => fk.columnNames.indexOf('userId') !== -1 || fk.columnNames.indexOf('psychId') !== -1);
            await queryRunner.dropForeignKeys('evaluation', foreignKeys);
        }
        await queryRunner.dropTable('evaluation');
    }
}