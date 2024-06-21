"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EvaluationController = void 0;
const UserRepository_1 = require("../repositories/UserRepository");
const PsychRepository_1 = require("../repositories/PsychRepository");
const EvaluationRepository_1 = require("../repositories/EvaluationRepository");
class EvaluationController {
    async create(req, res) {
        const { rating, review, psychId, userId } = req.body;
        try {
            const user = await UserRepository_1.userRepository.findOneBy({ id: Number(userId) });
            const psych = await PsychRepository_1.psychRepository.findOneBy({ id: Number(psychId) });
            if (!user) {
                return res.status(404).json({ message: 'Usuário não encontrado' });
            }
            if (!psych) {
                return res.status(404).json({ message: 'Psicólogo não encontrado' });
            }
            const newEvaluation = EvaluationRepository_1.evaluationRepository.create({ rating, review, user, psych });
            await EvaluationRepository_1.evaluationRepository.save(newEvaluation);
            return res.status(201).json(newEvaluation);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
    async list(req, res) {
        const { psychId } = req.params;
        try {
            const evaluations = await EvaluationRepository_1.evaluationRepository.find({
                where: { psych: { id: Number(psychId) } },
                relations: ['user', 'psych'],
            });
            return res.json(evaluations);
        }
        catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Erro interno do servidor' });
        }
    }
}
exports.EvaluationController = EvaluationController;
