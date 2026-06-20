import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { UserLogin } from '../model/user-login';

const URL = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  constructor() {}

  list(): Observable<User[]> {
    return this.http.get(URL + '/') as Observable<User[]>;
  }

  add(user: User): Observable<User> {
    return this.http.post(URL, user) as Observable<User>;
  }

  delete(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id);
  }

  getById(id: number): Observable<User> {
    return this.http.get(URL + '/' + id) as Observable<User>;
  }

  edit(user: User): Observable<User> {
    return this.http.put(URL + '/' + user.id, user) as Observable<User>;
  }

  login(userLogin: UserLogin): Observable<User> {
    return this.http.post(URL+'/login', userLogin) as Observable<User>;
  }

}