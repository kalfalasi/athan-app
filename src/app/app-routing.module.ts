import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PageNotFoundComponent } from "./shared/components";

import { HomeRoutingModule } from "./home/home-routing.module";
import { DetailRoutingModule } from "./detail/detail-routing.module";
import { AthanRoutingModule } from "./athan/athan-routing.module";

const routes: Routes = [
  {
    path: "",
    redirectTo: "athan",
    pathMatch: "full",
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: "legacy" }),
    HomeRoutingModule,
    AthanRoutingModule,
    DetailRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
