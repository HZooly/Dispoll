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

  public newPoll(): void {
    if (!this.discordID || !this.question || !this.choices) return;
    
    const poll = new Poll({
      discordID: this.discordID,
      question: this.question,
      choices: this.sanitizeChoices()
    });
    this._poll.newPoll(poll);
    this.clearInput();
  }

  private clearInput(): void {
    this.question = '';
    this.choices = [];
  }

  public isFormValid(): boolean {
    return !(this.discordID && this.question && this.areChoicesValid());
  }

  private sanitizeChoices(): Array<string> {
    return this.choices.filter(choice => choice && choice.length > 0);
  }

  private areChoicesValid(): boolean {
    return this.sanitizeChoices().length > 1;
  }

  public addChoice(): void {
    if (this.choices.length < 10) this.choices.push('');
  }

  public trackBy(index: any, item: any): any {
    return index;
  }
}
