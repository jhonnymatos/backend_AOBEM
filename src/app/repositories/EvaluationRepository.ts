import { AppDataSource } from "../../database/data-source";
import Evaluation from "../entities/Evaluation";
import IEvaluation from "../interfaces/IEvaluation";

export const evaluationRepository = AppDataSource.getRepository(Evaluation)
