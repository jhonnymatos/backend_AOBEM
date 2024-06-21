import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateFormsTable1718984828542 implements MigrationInterface {
          public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.createTable(
              new Table({
                name: 'forms',
                columns: [
                  {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                  },
                  {
                    name: 'fullName',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                  },
                  {
                    name: 'email',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                  },
                  {
                    name: 'state',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                  },
                  {
                    name: 'crp',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                  },
                  {
                    name: 'specialty',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                  },
                  {
                    name: 'specialty2',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                  },
                  {
                    name: 'formation',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                  },
                  {
                    name: 'formationArea',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                  },
                  {
                    name: 'service',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                  },
                  {
                    name: 'service2',
                    type: 'varchar',
                    length: '100',
                    isNullable: true,
                  },
                  {
                    name: 'shortBio',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                  },
                  {
                    name: 'fullBio',
                    type: 'varchar',
                    length: '100',
                    isNullable: false,
                  },
                ],
              }),
            );
          }
        
          public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropTable('forms');
          }
        }