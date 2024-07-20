class CustomErrorHandler extends Error {
    constructor(status, message) {
        super();
        this.status = status;
        this.message = message;
    };

    static userAlreadyExists(message) {
        return new CustomErrorHandler(409, message);
    }

    static dataValidationError(message = 'User Details incorrect. Please check the credentials') {
        return new CustomErrorHandler(401, message);
    }

    static noSuchUserExists(message = 'No such user Exists. Please register yourself') {
        return new CustomErrorHandler(401, message);
    }

    static wrongPassword(message = 'Incorrect Password') {
        return new CustomErrorHandler(401, message);
    }

    static unAuthorizedAccess(message = 'Unauthorized Access') {
        return new CustomErrorHandler(401, message);
    }

    static userNotFound(message = 'User Not Found') {
        return new CustomErrorHandler(404, message);
    }

    static blogValidationError(message = 'Blog values not specified') {
        return new CustomErrorHandler(401, message);
    }

    static blogNotExists(message = 'Blog does not exist') {
        return new CustomErrorHandler(404, message);
    }
}

export default CustomErrorHandler;
