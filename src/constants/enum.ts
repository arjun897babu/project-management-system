export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVER_ERROR = 500,
    CONFLICT = 409,
    CONTENT_TOO_LARGE = 413
}

export enum ResponseStatus {
    SUCCESS = 'Success',
    ERROR = 'Error',
}

export enum TaskStatus {
    TO_DO = 'To Do',
    In_Progress = 'In Progress',
    Done = 'Done'
}