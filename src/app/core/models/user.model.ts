export interface IUserLogin {
    username: string;
    password: string;
}

export interface IUserRegister extends IUserLogin {
    confirmpassword: string;
}

export interface IUser {
    unique_name: string;
}