import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {LEDService} from "../led.service";
import {Pattern, PatternService} from "../pattern.service";

@Component({
  selector: "app-wave",
  templateUrl: "./pattern.page.html",
  styleUrls: ["./pattern.page.scss"],
})
export class PatternPage implements OnInit {

  pattern: Pattern;

  constructor(private patternService: PatternService, private route: ActivatedRoute, private ledService: LEDService) {
    this.route.params.subscribe(params =>
      this.pattern = this.patternService.patterns
        .filter(pattern => pattern.name.toLowerCase() === params.name.toLowerCase())[0]
    );
  }

  ngOnInit() {
  }

  save() {
    this.ledService.save(this.pattern);
  }

  start() {
    this.ledService.save(this.pattern);
    this.ledService.start(this.pattern.name);
  }

  stop() {
    this.ledService.stop();
  }
}
