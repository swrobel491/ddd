import { Injectable } from '@angular/core';
import { ApiHttpService } from './api-http.service';
import { Observable } from 'rxjs';
import { ICallEvent, IUpdateCallEvent, IStatistics } from '../models/call.model';
import { map, switchMap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(protected httpApiService: ApiHttpService) { }

  public fetchCallEvents(startDate: string, endDate: string): Observable<ICallEvent[]> {
    return this.httpApiService.post<{ events: ICallEvent[] }>('/callevent/fetch-call-events', { startDate, endDate })
      .pipe(map(response => response.events));
  }

  public getCallEvents(startDate: string, endDate: string): Observable<ICallEvent[]> {
    return this.fetchCallEvents(startDate, endDate).pipe(
        switchMap(events => {
            return this.httpApiService.post<{ events: ICallEvent[] }>('/callevent/get-call-events', { startDate, endDate })
                .pipe(map(response => response.events));
        })
    );
  }

  public updateCallEvent(id: string, state: number, type: number): Observable<any> {
    return this.httpApiService.post<any>('/callevent/update-call-event', { id, state, type } as IUpdateCallEvent);
  }

  public getStatistics(startDate: string, endDate: string): Observable<IStatistics[]> {
    return this.fetchCallEvents(startDate, endDate).pipe(
        switchMap(events => {
            return this.httpApiService.post<any>('/callevent/get-call-statistics', { startDate, endDate })
                .pipe(map(response => response.statistics));
        })
    );
  }

}
