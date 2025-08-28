import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Apiservice {

    constructor(private http:HttpClient){}
    private url = 'http://localhost:4200/api/smartlock';

    getLockStatus():Observable<boolean[]>{
      return this.http.get<boolean[]>(this.url);
    }

    postFirstLock(Onoroff:boolean){
      return this.http.post(`${this.url}/sideLock`,Onoroff);
    }
    postSecondLock(Onoroff:boolean){
      return this.http.post(`${this.url}/emergencyLock`,Onoroff);
    }
    getLocation():Observable<number[]>{
      return this.http.get<number[]>(`${this.url}/location`);
    }
}
