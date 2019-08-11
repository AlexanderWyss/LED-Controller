import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouteReuseStrategy} from "@angular/router";
import {BLE} from "@ionic-native/ble/ngx";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {ColorPickerModule} from "@iplab/ngx-color-picker";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {PatternSettingsModule} from "./pattern-settings/pattern-settings.module";
import { IonicStorageModule } from "@ionic/storage";

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PatternSettingsModule,
    ColorPickerModule,
    NoopAnimationsModule,
    IonicStorageModule.forRoot()
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    BLE

  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
