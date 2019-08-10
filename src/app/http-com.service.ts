import {Injectable} from '@angular/core';
import {ComService} from './com.service';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpComService extends ComService {

    constructor(private http: HttpClient) {
        super();
    }

    write(name: string, data: object): Promise<object> {
        console.log('HTTP: Write: ' + name + ' ' + JSON.stringify(data));
        return this.http.get(name, {params: data as any}).toPromise();
    }

    read(name: string): Promise<any> {
        console.log('HTTP: Read: ' + name);
        return this.http.get(name).toPromise();
    }
}
