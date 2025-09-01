import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Apiservice {

    constructor(private http:HttpClient){}
    private url = 'http://localhost:8080/api/smartlock';

    getLockStatus():Observable<boolean[]>{
      return this.http.get<boolean[]>(`${this.url}/status`);
    }

    postLock(status:{sideLock:boolean,emergencyLock:boolean}){
      return this.http.post(`${this.url}/updateLock`,status);
    }
    getLocation():Observable<number[]>{
      return this.http.get<number[]>(`${this.url}/location`);
    }
}
