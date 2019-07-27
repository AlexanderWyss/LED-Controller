import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PatternService, Pattern} from '../pattern.service';
import {LEDService} from '../led.service';

@Component({
    selector: 'app-patterns',
    templateUrl: './patterns.page.html',
    styleUrls: ['./patterns.page.scss'],
})
export class PatternsPage implements OnInit {

    patterns: Pattern[];

    constructor(private router: Router, private patternService: PatternService, private ledService: LEDService) {
        this.patterns = this.patternService.patterns;
    }

    ngOnInit() {
    }

    toggle(pattern: Pattern) {
        this.ledService.start(pattern.name);
    }

    options(pattern: Pattern) {
        this.router.navigate(['/pattern/' + pattern.name]);
    }

    stop() {
        this.ledService.stop();
    }

    allOff() {
        this.ledService.allOff();
    }
}
