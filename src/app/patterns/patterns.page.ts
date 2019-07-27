import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {PatternService, Pattern} from '../pattern.service';

@Component({
    selector: 'app-patterns',
    templateUrl: './patterns.page.html',
    styleUrls: ['./patterns.page.scss'],
})
export class PatternsPage implements OnInit {

    BASE = '/api/';
    patterns: Pattern[];

    constructor(private http: HttpClient, private router: Router, private patternService: PatternService) {
        this.patterns = this.patternService.patterns;
    }

    ngOnInit() {
    }

    toggle(pattern: Pattern) {
        const param = new HttpParams()
            .set('pattern', pattern.name);
        this.http.get(this.BASE + 'start', {params: param}).subscribe();
    }

    options(pattern: Pattern) {
        this.router.navigate(['/pattern/' + pattern.name]);
    }

    stop() {
        this.http.get(this.BASE + 'stop').subscribe();
    }

    allOff() {
        this.http.get(this.BASE + 'alloff').subscribe();
    }
}
