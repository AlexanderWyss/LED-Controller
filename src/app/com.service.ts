import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ComService {

  constructor(private http: HttpClient) { }

  get(name: string, params?: HttpParams): Promise<any> {
    return this.http.get(name, {params}).toPromise();
  }
}
