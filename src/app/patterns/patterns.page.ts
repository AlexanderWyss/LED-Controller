import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';


export interface Pattern {
    name: string;
    text: string;
}

@Component({
    selector: 'app-patterns',
    templateUrl: './patterns.page.html',
    styleUrls: ['./patterns.page.scss'],
})
export class PatternsPage implements OnInit {

    BASE = '/api/start';
    patterns: Pattern[] = [
        {
            name: 'wave',
            text: 'Wave'
        }, {
            name: 'rainbow',
            text: 'Rainbow Cycle'
        }, {
            name: 'rider',
            text: 'Color Rider'
        }, {
            name: 'strobe',
            text: 'Strobe'
        }, {
            name: 'running',
            text: 'Running Light'
        }, {
            name: 'chase',
            text: 'Rainbow Chase'
        }, {
            name: 'sparkle',
            text: 'Rainbow Sparkle'
        }
    ];

    constructor(private http: HttpClient, private router: Router) {
    }

    ngOnInit() {
    }

    toggle(pattern: Pattern) {
        const param = new HttpParams()
            .set('pattern', pattern.name);
        this.http.get(this.BASE, {params: param}).subscribe();
    }

    options(pattern: Pattern) {
        this.router.navigate(['/' + pattern.name]);
    }

    stop() {
        this.http.get(this.BASE + 'stop').subscribe();
    }
}
