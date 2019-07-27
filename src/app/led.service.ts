import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Pattern} from "./pattern.service";

@Injectable({
    providedIn: 'root'
})
export class LEDService {

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

  save(pattern: Pattern) {
    let param = new HttpParams()
        .set('pattern', pattern.name);
    for (const patternSetting of pattern.patternSettings) {
      console.log(patternSetting.value.toString());
      param = param.set(patternSetting.name, patternSetting.value.toString());
    }
    this.http.get(this.BASE + 'options', {params: param}).subscribe();
  }
}
