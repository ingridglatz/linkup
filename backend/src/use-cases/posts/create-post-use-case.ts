import { PostsRepository } from "../../repositories/posts-repository";

type CreatePostParams = {
  text: string;
  medias?: string[];
  author: string;
};

type CreatePostResponse = {
  id: string;
  text: string;
  medias?: string[];
  author: string;
};

export class CreatePostUseCase {
  private postsRepository: PostsRepository;

  constructor() {
    this.postsRepository = new PostsRepository();
  }

  async create({
    text,
    medias,
    author,
  }: CreatePostParams): Promise<CreatePostResponse> {
    const post = await this.postsRepository.create({ text, medias, author });

    return {
      id: post.id,
      text: post.text,
      medias: post.medias,
      author: post.author,
    };
  }
}
