import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {RouteReuseStrategy} from "@angular/router";
import {AppVersion} from "@ionic-native/app-version/ngx";
import {BLE} from "@ionic-native/ble/ngx";
import {FileOpener} from "@ionic-native/file-opener/ngx";
import {File} from "@ionic-native/file/ngx";
import {SplashScreen} from "@ionic-native/splash-screen/ngx";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {IonicModule, IonicRouteStrategy} from "@ionic/angular";
import {IonicStorageModule} from "@ionic/storage";
import {ColorPickerModule} from "@iplab/ngx-color-picker";
import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {PatternSettingsModule} from "./pattern-settings/pattern-settings.module";

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
    BLE,
    AppVersion,
    File,
    FileOpener,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
  ],
  exports: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
