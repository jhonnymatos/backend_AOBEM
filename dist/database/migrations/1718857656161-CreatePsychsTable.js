"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePsychsTable1718857656161 = void 0;
const typeorm_1 = require("typeorm");
class CreatePsychsTable1718857656161 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
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
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('psychs');
    }
}
exports.CreatePsychsTable1718857656161 = CreatePsychsTable1718857656161;
