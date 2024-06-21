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
const User_1 = __importDefault(require("./User"));
const Psych_1 = __importDefault(require("./Psych"));
let Evaluation = class Evaluation {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)() //tipar q nem os oto
    ,
    __metadata("design:type", Number)
], Evaluation.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Evaluation.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Evaluation.prototype, "review", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Evaluation.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.default, user => user.evaluations),
    __metadata("design:type", User_1.default)
], Evaluation.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Psych_1.default, psych => psych.evaluations),
    __metadata("design:type", Psych_1.default)
], Evaluation.prototype, "psych", void 0);
Evaluation = __decorate([
    (0, typeorm_1.Entity)()
], Evaluation);
exports.default = Evaluation;
/*import { Router } from 'express';
import { EvaluationController } from './evaluation.controller';

const router = Router();
const evaluationController = new EvaluationController();

router.post('/evaluations', evaluationController.createEvaluation);
router.get('/evaluations', evaluationController.getEvaluations);
router.get('/evaluations/:id', evaluationController.getEvaluationById);
router.put('/evaluations/:id', evaluationController.updateEvaluation);
router.delete('/evaluations/:id', evaluationController.deleteEvaluation);

export default router;*/
/*import { Router } from 'express';
import evaluationRoute from './evaluation.route';

const router = Router();

router.use('/evaluations', evaluationRoute);

export default router;*/ 
