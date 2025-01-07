import { Injectable } from '@angular/core';
import { IUser } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface AuthApiJwtPayload extends JwtPayload {
    unique_name: string;
    role: string;
}

@Injectable({
    providedIn: 'root'
})
export class JwtTokenService {
    readonly tokenKeyName: string = 'token';
    private _decodedToken?: AuthApiJwtPayload;
    constructor(private localStorageService: LocalStorageService) { }

    public getUser(): IUser | undefined {
        const token = this.decodeToken();
        if (!token) {
            return undefined;
        }
        return {
            unique_name: token.unique_name,
        };
    }

    public isExpTokenValid(): boolean {
        const token = this.decodeToken();
        if (!token) {
            return false;
        }
        if(token.exp) {
            return token.exp > Date.now() / 1000;
        }
        this.removeToken();
        return false;
    }

    public setToken(token: string) {
        this.localStorageService.set(this.tokenKeyName, token);
    }

    public getToken(): string | undefined {
        const token = this.localStorageService.get(this.tokenKeyName);
        return token ?? undefined;
    }

    private decodeToken(): AuthApiJwtPayload | undefined {
        if (this._decodedToken) {
            return this._decodedToken;
        }
        const tokenValue = this.localStorageService.get(this.tokenKeyName);
        if (!tokenValue) {
            return undefined;
        }
        this._decodedToken = jwtDecode<AuthApiJwtPayload>(tokenValue);
        return this._decodedToken;
    }

    public removeToken() {
        this._decodedToken = undefined;
        this.localStorageService.remove(this.tokenKeyName);
    }

}
