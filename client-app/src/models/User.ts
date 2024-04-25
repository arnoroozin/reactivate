export interface User{
    username:string;
    displayName:string;
    image?:string;
    token:string;
}
export interface UserFormValues{
    email:string;
    displayName?:string;
    password:string;
    username?:string;
}