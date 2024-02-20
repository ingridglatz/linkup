import { PostNotFound } from "../../exceptions/post-not-found";
import { PostsRepository } from "../../repositories/posts-repository";

type ReadPostResponse = {
  id: string;
  text: string;
  medias?: string[];
  author: string;
};

export class ReadPostUseCase {
  private postRepository: PostsRepository;
  constructor() {
    this.postRepository = new PostsRepository();
  }
  async read(id: string): Promise<ReadPostResponse> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new PostNotFound();
    }
    return {
      id: post.id,
      text: post.text,
      medias: post.medias,
      author: post.author,
    };
  }
}
