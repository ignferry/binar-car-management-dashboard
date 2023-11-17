export default class WrongAuthCredentialsException extends Error {
    constructor() {
        super("Wrong Authentication Credentials");
    }
}