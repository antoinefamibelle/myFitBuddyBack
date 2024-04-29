export interface ResponseRo<T> {
    status_code: number;
    message: string;
    data: T;
    errors: string[];
}