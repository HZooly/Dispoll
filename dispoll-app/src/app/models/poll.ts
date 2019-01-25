export class Poll {
  discordName: string;
  question: string;
  choices: Array<String>;

  constructor({...values}) {
    Object.assign(this, values);
  }
}
