import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApiHttpService {
    protected rootUrl: string = 'https://191.101.0.94:5001/api';

    constructor(protected httpClient: HttpClient) { }

    public post<T>(path: string, body: any | undefined): Observable<T> {
        return this.httpClient.post<T>(this.createUrl(path), body, {

        });
    }

    public get<T>(path: string): Observable<T> {
        return this.httpClient.get<T>(this.createUrl(path));
    }

    protected createUrl(path: string): string {
        return `${this.rootUrl}${path}`;
    }
}
