import { Component, OnInit } from "@angular/core";
import moment from "moment";
import timings from "../../assets/prayertimings.json";

// declare var require: any;

@Component({
  selector: "app-athan",
  templateUrl: "./athan.component.html",
  styleUrls: ["./athan.component.scss"],
})
export class AthanComponent implements OnInit {
  audio = new Audio();

  day: any;
  time: any;
  date: any;
  hijriDate: any;
  jsonDate: any;
  timings: any = timings;
  athanTimings: any;
  athanTimingsIndex: any;
  timeRemaining: any;
  nextPrayerLabel: any;
  prayersCompleted: boolean = false;
  todayAthanTimings: any = {};
  athanTimingsArray: any;
  mutedAthanTimings: any[] = [false, false, false, false, false];

  constructor() {
    // audio src
    this.audio.src = "./assets/athan-new.mp3";
    //this.playMutedAudio();

    // load muted athan timings from session storage
    if (sessionStorage.getItem("mutedAthanTimings"))
      this.mutedAthanTimings = JSON.parse(
        sessionStorage.getItem("mutedAthanTimings")
      );

    setInterval(() => {
      this.time = moment().format("h:mm A");
      this.day = moment().format("dddd");
      this.date = moment().format("D MMMM YYYY");
      this.jsonDate = moment().format("DD/MM/YYYY");

      // get athan timings data from JSON file
      this.athanTimingsIndex = this.timings.findIndex(
        (t: any) => t.date === this.jsonDate
      );
      this.athanTimings = this.timings[this.athanTimingsIndex];

      // set today's data in a new object
      if (this.athanTimings.date !== this.todayAthanTimings.date)
        this.todayAthanTimings = this.athanTimings;

      // set hijri date
      this.hijriDate = this.todayAthanTimings.hijriDate;

      // set athan timings array
      this.athanTimingsArray = this.todayAthanTimings.timings;

      this.athanTimingsArray.map((t: any, i: number) => {
        t.isMuted = this.mutedAthanTimings[i];
      });

      // get next athan time
      const nextPrayerIndex = this.athanTimingsArray.findIndex(
        (t: any) => this.formatSeconds(t.time) > new Date().getTime()
      );

      // play athan audio when there is a time match
      const playAthanIndex = this.athanTimingsArray.findIndex(
        (at: any) => at.time === this.time.toString()
      );

      if (nextPrayerIndex >= 0 || playAthanIndex >= 0) {
        // if index is found, today's athan timings will be shown
        if (nextPrayerIndex >= 0) {
          this.prayersCompleted = false;

          // get time difference for next athan
          const timeDiff =
            this.formatSeconds(this.athanTimingsArray[nextPrayerIndex].time) -
            new Date().getTime();
          this.timeRemaining = this.msToTime(timeDiff);
          this.nextPrayerLabel = this.athanTimingsArray[nextPrayerIndex].title;

          // set previous prayer as current if not aleady set
          if (
            nextPrayerIndex > 0 &&
            !this.athanTimingsArray[nextPrayerIndex - 1].isCurrent
          )
            this.athanTimingsArray[nextPrayerIndex - 1].isCurrent = true;
        }

        // play athan when time matches
        if (playAthanIndex >= 0) {
          this.athanTimingsArray[playAthanIndex].isCurrent = true;

          if (playAthanIndex > 0)
            this.athanTimingsArray[playAthanIndex - 1].isCurrent = false;

          if (
            !this.mutedAthanTimings[playAthanIndex] &&
            !this.athanTimingsArray[playAthanIndex].isPlayed
          ) {
            this.playAudio();
            this.athanTimingsArray[playAthanIndex].isPlayed = true;
          }
        }
      } else this.prayersCompleted = true;
    }, 1000);
  }

  ngOnInit() {}

  playMutedAudio() {
    this.audio.load();
    this.audio.muted = true;
    this.audio.play();
  }

  playAudio() {
    this.audio.load();
    this.audio.muted = false;
    this.audio.play();
  }

  updateMutedAthans(isMuted: any, index: number) {
    this.mutedAthanTimings[index] = isMuted;

    // save in session storage
    sessionStorage.setItem(
      "mutedAthanTimings",
      JSON.stringify(this.mutedAthanTimings)
    );
  }

  pauseAudio() {
    this.audio.pause();
  }

  formatSeconds(time: any) {
    return moment(time, ["h:mm A"]).toDate().getTime();
  }

  msToTime(s: any) {
    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    const hrs = (s - mins) / 60;

    return this.pad(hrs) + ":" + this.pad(mins) + ":" + this.pad(secs);
  }

  // Pad to 2 or 3 digits, default is 2
  pad(n: any, z?: any) {
    z = z || 2;
    return ("00" + n).slice(-z);
  }
}
