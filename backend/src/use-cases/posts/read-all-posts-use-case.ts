import { UserNotFound } from "../../exceptions/user-not-found";
import { PostsRepository } from "../../repositories/posts-repository";
import { UserRepository } from "../../repositories/user-repository";

type ReadAllPostsResponse = {
  id: string;
  text: string;
  medias?: string[];
  author: string;
}[];

export class ReadAllPostsUseCase {
  private postRepository: PostsRepository;
  private userRepository: UserRepository;

  constructor() {
    this.postRepository = new PostsRepository();
    this.userRepository = new UserRepository();
  }

  async read(author: string): Promise<ReadAllPostsResponse> {
    const user = await this.userRepository.findById(author);

    if (!user) {
      throw new UserNotFound();
    }

    const posts = await this.postRepository.findByAuthor(author);

    return posts.map((post) => ({
      id: post.id,
      text: post.text,
      medias: post.medias,
      author: post.author,
    }));
  }
}
