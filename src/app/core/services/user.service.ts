import { Injectable } from '@angular/core';
import { JwtTokenService } from './jwt-token.service';
import { ApiHttpService } from './api-http.service';
import { IUser, IUserLogin, IUserRegister } from '../models/user.model';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    public get loggedUser(): IUser | undefined {
        return this.jwtTokenService.getUser();
    }

    constructor(private jwtTokenService: JwtTokenService, private httpApiService: ApiHttpService) { }

    public isAuthenticated(): boolean {
        return this.jwtTokenService.isExpTokenValid() && this.jwtTokenService.getUser() !== undefined;
    }

    public login(user: IUserLogin): Observable<IUser | undefined> {
        return this.httpApiService.post<string>('/user/login', { ...user }).pipe(
            map((response: any) => {
                this.jwtTokenService.setToken(response.token);
                return this.jwtTokenService.getUser();
            })
        );
    }

    public register(user: IUserRegister): Observable<boolean> {
        return this.httpApiService.post<boolean>('/user/register', { ...user });
    }

    public logout(): void {
        this.jwtTokenService.removeToken();
    }

    public getUser(): IUser | undefined {
        // return this.httpApiService.get<IUser[]>('/v1/user/users-info');

        return this.jwtTokenService.getUser();
    }
}
