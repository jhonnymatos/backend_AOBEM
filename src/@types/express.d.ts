import User from "../app/entities/User";
import Psych from "../app/entities/Psych";

declare global {
    namespace Express {
        export interface Request {
            user: Partial<User>;
        }
    }
    namespace Express {
        export interface Request {
            psych: Partial<Psych>;
        }
    }
}