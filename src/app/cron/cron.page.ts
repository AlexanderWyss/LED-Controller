import {Component, OnInit} from "@angular/core";
import {Pattern, PatternService} from "../pattern.service";
import {LEDService} from "../led.service";
import {CronJob} from "../CronJob";

@Component({
    selector: "app-cron",
    templateUrl: "./cron.page.html",
    styleUrls: ["./cron.page.scss"],
})
export class CronPage implements OnInit {
    patterns: Pattern[];
    cron: CronJob = {cron: "", pattern: ""};
    cronJobs: CronJob[];


    constructor(private patternService: PatternService, private ledService: LEDService) {
        this.patterns = this.patternService.patterns;
    }

    add() {
        this.ledService.addCron(this.cron);
    }

    remove(cron: CronJob) {
        this.ledService.removeCron(cron);
    }

    ngOnInit() {
        this.ledService.getCrons().then(cronJobs => this.cronJobs = cronJobs);
    }
}
