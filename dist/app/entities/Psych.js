"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Evaluation_1 = __importDefault(require("./Evaluation"));
let Psych = class Psych {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment'),
    __metadata("design:type", Number)
], Psych.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: false }),
    __metadata("design:type", String)
], Psych.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: false }),
    __metadata("design:type", String)
], Psych.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: false }),
    __metadata("design:type", String)
], Psych.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: false }),
    __metadata("design:type", String)
], Psych.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: false }),
    __metadata("design:type", String)
], Psych.prototype, "crp", void 0);
__decorate([
    (0, typeorm_1.Column)('varchar', { length: 100, nullable: false }),
    __metadata("design:type", String)
], Psych.prototype, "estado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Evaluation_1.default, evaluation => evaluation.psych),
    __metadata("design:type", Array)
], Psych.prototype, "evaluations", void 0);
Psych = __decorate([
    (0, typeorm_1.Entity)('psychs')
], Psych);
exports.default = Psych;
