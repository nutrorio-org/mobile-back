import { randomUUID } from 'crypto';

export class FoodDiary {
  constructor(
    public id: string,
    readonly date: string,
    readonly title: string,
    readonly description: string,
    readonly photos?: string[],
    readonly comments?: string,
    readonly emoji: string = 'none'
  ) {
    this.id = id;
    this.date = date;
    this.title = title;
    this.description = description;
    this.photos = photos;
    this.comments = comments;
    this.emoji = emoji ?? 'none';
  }
  static create(data: InputFoodDiary) {
    const { date, description, emoji, title, comments, photos } = data;
    return new FoodDiary(
      randomUUID(),
      date,
      title,
      description,
      photos,
      comments,
      emoji
    );
  }
  setId(id: string) {
    this.id = id;
  }
}
type InputFoodDiary = {
  date: string;
  title: string;
  description: string;
  photos?: string[] | undefined;
  emoji?: string;
  comments?: string | undefined;
};
