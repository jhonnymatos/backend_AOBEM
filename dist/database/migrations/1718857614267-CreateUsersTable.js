"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1718857614267 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1718857614267 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
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
                }
                /*{
                    name: 'confirmPassword',
                    type: 'varchar',
                    length: '100',
                    isNullable: false
                }*/
            ]
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.CreateUsersTable1718857614267 = CreateUsersTable1718857614267;
