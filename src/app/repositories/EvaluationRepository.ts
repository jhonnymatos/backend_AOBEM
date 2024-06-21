import { AppDataSource } from "../../database/data-source";
import Evaluation from "../entities/Evaluation";

export const evaluationRepository = AppDataSource.getRepository(Evaluation)