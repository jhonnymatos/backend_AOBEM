"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFormsTable1718984828542 = void 0;
const typeorm_1 = require("typeorm");
class CreateFormsTable1718984828542 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('forms');
    }
}
exports.CreateFormsTable1718984828542 = CreateFormsTable1718984828542;
