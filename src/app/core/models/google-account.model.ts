export interface IGoogleAccount {
    googleId: string;
    email: string;
}

export interface IAuthorizationUrl {
    authorizationUrl: string;
}

export interface IAuthorizationCode {
    authorizationCode: string;
}

export interface IGetAccountsRequest {
    skip: number;
    limit: number;
}
