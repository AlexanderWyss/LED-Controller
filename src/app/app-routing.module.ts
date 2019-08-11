import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "patterns",
    pathMatch: "full"
  },
  {path: "patterns", loadChildren: "./patterns/patterns.module#PatternsPageModule"},
  {path: "settings", loadChildren: "./settings/settings.module#SettingsPageModule"},
  {path: "pattern/:name", loadChildren: "./pattern/pattern.module#PatternPageModule"},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
