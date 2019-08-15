import {Component, OnInit, ViewChild} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {IonRefresher} from "@ionic/angular";
import {LEDService} from "../led.service";
import {Pattern, PatternService} from "../pattern.service";
import {ToastService} from "../toast.service";

@Component({
  selector: "app-wave",
  templateUrl: "./pattern.page.html",
  styleUrls: ["./pattern.page.scss"],
})
export class PatternPage implements OnInit {

  @ViewChild(IonRefresher) refresher: IonRefresher;

  pattern: Pattern;

  constructor(private patternService: PatternService, private route: ActivatedRoute, private ledService: LEDService,
              private toast: ToastService) {
    this.route.params.subscribe(params =>
      this.pattern = this.patternService.patterns
        .filter(pattern => pattern.name.toLowerCase() === params.name.toLowerCase())[0]
    );
  }

  ngOnInit() {
    this.refresh(this.refresher);
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

  refresh(refresher: any) {
    this.patternService.refresh().catch((error) => {
      console.error(error);
      this.toast.error("Something went wrong while refreshing Settings");
    }).finally(() => refresher.complete());
  }
}
