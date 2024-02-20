type PostConstructorParams = {
  id?: string;
  text: string;
  medias?: string[];
  author: string;
};

export class Post {
  id: string;
  text: string;
  medias?: string[];
  author: string;

  constructor(params: PostConstructorParams) {
    this.id = params.id || "";
    this.text = params.text;
    this.medias = params.medias;
    this.author = params.author;
  }
}
