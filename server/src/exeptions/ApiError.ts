class ApiError extends Error {
    status: number;
    message: string;
    errors: any[];

    constructor(status: number, message: string, errors: any[] = []) {
        super(message);
        this.status = status;
        this.message = message;
        this.errors = errors;
    }

    static BadRequest(message: string, errors: any[] = []) {
        return new ApiError(400, message, errors)
    }

    static Internal(message: string) {
        return new ApiError(500, message)
    }

    static Forbidden(message: string) {
        return new ApiError(403, message)
    }

    static Unauthorized() {
        return new ApiError(401, 'Пользователь не авторизован!')
    }

    static NoneRules() {
        return new ApiError(403, 'Нет доступа!')
    }

}

export default ApiError