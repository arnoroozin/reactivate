export interface User{
    userName:string;
    displayName:string;
    image?:string;
    token:string;
}
export interface UserFormValues{
    email:string;
    displayName?:string;
    password:string;
    userName?:string;
}