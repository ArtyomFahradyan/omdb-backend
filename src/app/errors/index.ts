import {
    SERVICE_UNAVAILABLE,
    BAD_REQUEST_CODE,
    NOT_FOUND_CODE,
    SERVICE_UNAVAILABLE_CODE,
    SOMETHING_WENT_WRONG,
} from "app/constatnts";

export class BadRequest extends Error {
    status = BAD_REQUEST_CODE;
    message: string;
    errors;

    constructor(message: string, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class NotFound extends Error {
    status = NOT_FOUND_CODE;
    message: string;
    errors;

    constructor(message: string, errors = null) {
        super();
        this.message = message;
        this.errors = errors;
    }
}

export class ExternalApiError extends Error {
    status = SERVICE_UNAVAILABLE_CODE;
    message = SERVICE_UNAVAILABLE;
    errors;

    constructor(errors) {
        super();
        this.errors = errors;
    }
}

export class ServiceUnavailable extends Error {
    status = BAD_REQUEST_CODE;
    message = SOMETHING_WENT_WRONG;
    errors;

    constructor(message: string, errors = null) {
        super();

        if (errors) {
            this.message = message;
            this.errors = errors;
        } else {
            if (typeof message === "string") {
                this.message = message;
            } else {
                this.errors = message;
            }
        }
    }
}
