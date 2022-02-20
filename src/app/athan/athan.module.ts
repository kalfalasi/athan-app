import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AthanComponent } from "./athan.component";
import { AthanRoutingModule } from "./athan-routing.module";
import { SharedModule } from "../shared/shared.module";
import { AthanTimeComponent } from "./athan-time/athan-time.component";

@NgModule({
  imports: [CommonModule, SharedModule, AthanRoutingModule],
  declarations: [AthanComponent, AthanTimeComponent],
})
export class AthanModule {}
