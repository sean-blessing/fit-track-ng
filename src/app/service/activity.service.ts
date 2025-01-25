import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Activity } from '../model/activity';

const URL = 'http://localhost:8080/api/activities';

@Injectable({
  providedIn: 'root',
})
export class ActivityService {
  constructor(private http: HttpClient) {}

  list(): Observable<Activity[]> {
    return this.http.get(URL + '/') as Observable<Activity[]>;
  }

  add(activity: Activity): Observable<Activity> {
    return this.http.post(URL, activity) as Observable<Activity>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id);
  }

  getById(id: number): Observable<Activity> {
    return this.http.get(URL + '/' + id) as Observable<Activity>;
  }

  edit(activity: Activity): Observable<Activity> {
    return this.http.put(URL + '/' + activity.id, activity) as Observable<Activity>;
  }
}