import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AthanComponent } from "./athan.component";

const routes: Routes = [
  {
    path: "athan",
    component: AthanComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AthanRoutingModule {}
