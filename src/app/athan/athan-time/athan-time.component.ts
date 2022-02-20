import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import moment from "moment";

@Component({
  selector: "athan-time",
  templateUrl: "./athan-time.component.html",
  styleUrls: ["./athan-time.component.scss"],
})
export class AthanTimeComponent implements OnInit {
  @Input() time: any;
  @Output() muteAudio = new EventEmitter<any>();

  constructor() {}

  ngOnInit() {}

  toggleMute() {
    this.time.isMuted = !this.time.isMuted;
    this.muteAudio.emit(this.time.isMuted);
  }

  formatTime(time: any) {
    return moment(time, ["h:mm:ss A"]).format("h:mm A");
  }
}
