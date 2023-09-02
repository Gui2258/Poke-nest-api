
export interface HttpAdaper {

    get<T>(url : string): Promise<T>;

}