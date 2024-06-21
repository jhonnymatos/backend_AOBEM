"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsController = void 0;
const data_source_1 = require("../../database/data-source");
const Forms_1 = __importDefault(require("../entities/Forms"));
class FormsController {
    constructor() {
        this.formsRepository = data_source_1.AppDataSource.getRepository(Forms_1.default);
    }
    async createForm(req, res) {
        try {
            const newForm = this.formsRepository.create(req.body);
            await this.formsRepository.save(newForm);
            res.status(201).json({ message: 'Formulário criado com sucesso' });
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao criar formulário' });
        }
    }
    async getForms(req, res) {
        try {
            const forms = await this.formsRepository.find();
            res.json(forms);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar formulários' });
        }
    }
    async getFormById(req, res) {
        const id = +req.params.id; // converte string para número
        try {
            const form = await this.formsRepository.findOneBy({ id });
            if (!form) {
                res.status(404).json({ message: 'Formulário não encontrado' });
            }
            else {
                res.json(form);
            }
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar formulário' });
        }
    }
    async getFormsByFilter(req, res) {
        const filter = req.params.filter;
        const value = req.params.value;
        try {
            const forms = await this.formsRepository.findBy({ [filter]: value });
            res.json(forms);
        }
        catch (error) {
            res.status(500).json({ message: 'Erro ao buscar formulários' });
        }
    }
}
exports.FormsController = FormsController;
