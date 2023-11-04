import logger from "@utils/logger";
import { NextFunction, Request, Response } from "express";
import { CheckViolationError, DBError, DataError, ForeignKeyViolationError, NotFoundError, NotNullViolationError, UniqueViolationError, ValidationError } from "objection";
import { DatabaseError } from "pg";
import NoFileReceivedException from "@exceptions/NoFileReceivedException";

export const exceptionHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err) {
        if (err instanceof ValidationError 
            || err instanceof DataError 
            || err instanceof CheckViolationError 
            || err instanceof NotNullViolationError
            || err instanceof NoFileReceivedException
        ) {
            logger.warn(err, `${req.method} ${req.url} : Bad Request`)
            res.status(400).json(
                {
                    success: false,
                    message: "Bad Request"
                }
            );
        } else if (err instanceof NotFoundError) {
            logger.warn(err, `${req.method} ${req.url} : Not Found`)
            res.status(404).json(
                {
                    success: false,
                    message: "Not Found"
                }
            );
        } else if (err instanceof UniqueViolationError || err instanceof ForeignKeyViolationError) {
            logger.warn(err, `${req.method} ${req.url} : Constraint Violation Error`)
            res.status(409).json(
                {
                    success: false,
                    message: "Constraint Violation Error"
                }
            );
        } else if (err instanceof DBError || err instanceof DatabaseError) {
            logger.error(err, `${req.method} ${req.url} : Database Error`)
            res.status(500).json(
                {
                    success: false,
                    message: "Database Error"
                }
            );
        } else {
            logger.error(err, `${req.method} ${req.url} : System Error`)
            res.status(500).json(
                {
                    success: false,
                    message: "System Error"
                }
            );
        }
    }
    
    next();
}