import Psych from "../entities/Psych";
import IPsych from "../interfaces/IPsych";
import { AppDataSource } from "../../database/data-source";

const psychRepository = AppDataSource.getRepository(Psych);

const getPsychs = (): Promise<IPsych[]> => {
    return psychRepository.find();
}

export default { getPsychs };