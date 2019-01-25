import { PollService } from './models/poll.service';
import { Component } from '@angular/core';
import { Poll } from './models/poll';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  discordID: string;
  question: string;
  choices: Array<string> = ['First choice'];

  constructor(private _poll: PollService) { }

  public newPoll() {
    if (!this.discordID || !this.question || !this.choices) return;
    const poll = new Poll({
      discordID: this.discordID,
      question: this.question,
      choices: this.choices
    });
    this._poll.newPoll(poll);
  }

  public addChoice() {
    if (this.choices.length < 10) this.choices.push('');
  }

  public trackBy(index: any, item: any) {
    return index;
  }
}
