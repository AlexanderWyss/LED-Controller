import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-patterns',
  templateUrl: './patterns.page.html',
  styleUrls: ['./patterns.page.scss'],
})
export class PatternsPage implements OnInit {

  BASE = '/';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  wave() {
    this.http.get(this.BASE + 'wave').subscribe();
  }

  rainbowCycle() {
    this.http.get(this.BASE + 'rainbow').subscribe();
  }

  colorRider() {
    this.http.get(this.BASE + 'rider').subscribe();
  }

  strobe() {
    this.http.get(this.BASE + 'strobe').subscribe();
  }

  runningLight() {
    this.http.get(this.BASE + 'running').subscribe();
  }

  rainbowChase() {
    this.http.get(this.BASE + 'chase').subscribe();
  }

  rainbowSparkle() {
    this.http.get(this.BASE + 'sparkle').subscribe();
  }

  stop() {
    this.http.get(this.BASE + 'stop').subscribe();
  }
}
