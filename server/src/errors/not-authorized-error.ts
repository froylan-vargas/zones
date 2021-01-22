import { CustomError } from './custom-error'

export class NotAuthorizederror extends CustomError {

    constructor() {
        super('Not authorized');
        Object.setPrototypeOf(this, NotAuthorizederror.prototype);
    }

    statusCode = 401;
    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: 'Not authorized' }];
    }

}