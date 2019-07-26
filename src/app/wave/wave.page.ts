import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Component({
    selector: 'app-wave',
    templateUrl: './wave.page.html',
    styleUrls: ['./wave.page.scss'],
})
export class WavePage implements OnInit {

    BASE = '/api/options';
    size = 0;
    speed = 20;
    returnValue = 40;

    constructor(private http: HttpClient) {
    }

    ngOnInit() {
    }

    save() {
        const param = new HttpParams()
            .set('pattern', 'wave')
            .set('size', this.size.toString())
            .set('speed', this.speed.toString())
            .set('returnValue', this.returnValue.toString());
        this.http.get(this.BASE, {params: param}).subscribe();
    }
}
