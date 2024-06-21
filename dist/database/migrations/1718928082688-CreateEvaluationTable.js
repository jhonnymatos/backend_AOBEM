"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateEvaluationTable1718928082688 = void 0;
const typeorm_1 = require("typeorm");
class CreateEvaluationTable1718928082688 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'evalution',
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
                }
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('evalution');
    }
}
exports.CreateEvaluationTable1718928082688 = CreateEvaluationTable1718928082688;
