export abstract class CustomException extends Error {
    protected constructor(message: string) {
        super(message);
    }
}
