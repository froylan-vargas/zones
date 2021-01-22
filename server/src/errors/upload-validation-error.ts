import { CustomError } from './custom-error';

export class UploadValidationError extends CustomError {
    statusCode = 400;
    constructor(private errors: Error[]) {
        super('Invalid data to upload');
        Object.setPrototypeOf(this, UploadValidationError.prototype);
    }

    serializeErrors() {
        return this.errors.map(error => {
            return { message: error.message };
        });
    }
}