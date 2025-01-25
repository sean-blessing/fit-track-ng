import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Exercise } from '../model/exercise';
import { ExerciseDayReport } from '../model/exercise-day-rpt';
import { ExerciseWeekReport } from '../model/exercise-week-rpt';

const URL = 'http://localhost:8080/api/exercises';

@Injectable({
  providedIn: 'root',
})
export class ExerciseService {
  constructor(private http: HttpClient) {}

  list(): Observable<Exercise[]> {
    return this.http.get(URL + '/') as Observable<Exercise[]>;
  }

  add(exercise: Exercise): Observable<Exercise> {
    return this.http.post(URL, exercise) as Observable<Exercise>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id);
  }

  getById(id: number): Observable<Exercise> {
    return this.http.get(URL + '/' + id) as Observable<Exercise>;
  }

  edit(exercise: Exercise): Observable<Exercise> {
    return this.http.put(URL + '/' + exercise.id, exercise) as Observable<Exercise>;
  }

  getDayReport(): Observable<ExerciseDayReport[]> {
    return this.http.get(URL + '/day-report/') as Observable<ExerciseDayReport[]>;
  }

  getWeekReport(): Observable<ExerciseWeekReport[]> {
    return this.http.get(URL + '/week-report/') as Observable<ExerciseWeekReport[]>;
  }
}