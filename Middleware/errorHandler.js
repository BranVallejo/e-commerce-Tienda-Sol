import { ZodError } from "zod";

export const errorHandler = (err, req, res, next) => {


    if (err instanceof ZodError) {

        return res.status(400).json({
            error: 'Validation failed',
            issues: err.issues
        });
    }

    const status = err.status || err.statusCode || 500;
    const message = err.message || 'Error interno del servidor';

    res.status(status).json({
        error: message
    });
}