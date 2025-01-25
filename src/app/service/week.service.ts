import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Week } from '../model/week';

const URL = 'http://localhost:8080/api/weeks';

@Injectable({
  providedIn: 'root',
})
export class WeekService {
  constructor(private http: HttpClient) {}

  list(): Observable<Week[]> {
    return this.http.get(URL + '/') as Observable<Week[]>;
  }

  add(week: Week): Observable<Week> {
    return this.http.post(URL, week) as Observable<Week>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id);
  }

  getById(id: number): Observable<Week> {
    return this.http.get(URL + '/' + id) as Observable<Week>;
  }

  edit(week: Week): Observable<Week> {
    return this.http.put(URL + '/' + week.id, week) as Observable<Week>;
  }
}