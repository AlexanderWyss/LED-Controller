import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Pattern} from './pattern.service';
import {map} from 'rxjs/operators';

export interface SerialPort {
    comName: string;
    manufacturer?: string;
    serialNumber?: string;
    pnpId?: string;
    locationId?: string;
    productId?: string;
    vendorId?: string;
}

@Injectable({
    providedIn: 'root'
})
export class LEDService {

    private selectedPort: string;

    BASE = '/api/';

    constructor(private http: HttpClient) {
    }

    public start(name: string) {
        const param = new HttpParams()
            .set('pattern', name);
        this.http.get(this.BASE + 'start', {params: param}).subscribe();
    }

    public stop() {
        this.http.get(this.BASE + 'stop').subscribe();
    }

    public allOff() {
        this.http.get(this.BASE + 'alloff').subscribe();
    }

    public save(pattern: Pattern) {
        let param = new HttpParams()
            .set('pattern', pattern.name);
        for (const patternSetting of pattern.patternSettings) {
            console.log(patternSetting.value.toString());
            param = param.set(patternSetting.name, patternSetting.value.toString());
        }
        this.http.get(this.BASE + 'options', {params: param}).subscribe();
    }

    public getSerialports(): Promise<SerialPort[]> {
        return this.http.get(this.BASE + 'serialport/get').pipe(map((result: any) => result.serialports)).toPromise();
    }

    public setSerialport(name: string) {
        this.selectedPort = name;
        const param = new HttpParams()
            .set('name', name);
        this.http.get(this.BASE + 'serialport/set', {params: param}).subscribe();
    }

    public getSelectedPort() {
        return this.selectedPort;
    }
}
