export interface User{
    email:String,
    password:String
}


export interface Category {
    name:String,
    imageSrc?:String,
    user?:String,
    _id?:string
}