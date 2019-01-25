export class Poll {
  discordID: string;
  question: string;
  choices: Array<String>;

  constructor({...values}) {
    Object.assign(this, values);
  }
}
