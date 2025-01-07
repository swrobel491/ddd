import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';
import { IAuthorizationCode, IAuthorizationUrl, IGetAccountsRequest, IGoogleAccount } from '../models/google-account.model';


@Injectable({
  providedIn: 'root'
})

export class GoogleAccountService {

  constructor(protected httpApiService: ApiHttpService) { }

  public getAuthorizationUrl(): Observable<IAuthorizationUrl> {
    return this.httpApiService.get<IAuthorizationUrl>('/googleaccount/authorization-url');
  }
  public linkAccount(code: string): Observable<any> {
    return this.httpApiService.post<any>('/googleaccount/link-google-account', { authorizationCode: code });
  }
  public getAccounts(getAccountsRequest: IGetAccountsRequest): Observable<IGoogleAccount[]> {
    return this.httpApiService.post<IGoogleAccount[]>('/googleaccount/get-accounts', getAccountsRequest);
  }
  public getMyAccounts(): Observable<IGoogleAccount[]> {
    return this.httpApiService.get<IGoogleAccount[]>('/googleaccount/get-my-accounts');
  }
}
