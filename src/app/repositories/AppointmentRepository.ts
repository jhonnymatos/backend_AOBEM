import Appointment from "../entities/Appointment";
import { AppDataSource } from "../../database/data-source";

export const appointmentRepository = AppDataSource.getRepository(Appointment);