export class ApiError extends Error{
    operational = true;
    constructor(public statusCode: number, public message: string){
        super(message);
    }
}