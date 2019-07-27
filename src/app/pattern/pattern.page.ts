import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Pattern, PatternService} from '../pattern.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-wave',
    templateUrl: './pattern.page.html',
    styleUrls: ['./pattern.page.scss'],
})
export class PatternPage implements OnInit {

    BASE = '/api/options';
    pattern: Pattern;

    constructor(private http: HttpClient, private patternService: PatternService, private route: ActivatedRoute) {
        this.route.params.subscribe(params =>
            this.pattern = this.patternService.patterns
                .filter(pattern => pattern.name.toLowerCase() === params.name.toLowerCase())[0]
        );
    }

    ngOnInit() {
    }

    save() {
        let param = new HttpParams()
            .set('pattern', this.pattern.name);
        for (const patternSetting of this.pattern.patternSettings) {
            console.log(patternSetting.value.toString());
            param = param.set(patternSetting.name, patternSetting.value.toString());
        }
        this.http.get(this.BASE, {params: param}).subscribe();
    }
}
