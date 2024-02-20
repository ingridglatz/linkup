import { PostNotFound } from "../../exceptions/post-not-found";
import { PostsRepository } from "../../repositories/posts-repository";

export class DeletePostUseCase {
  private postRepository: PostsRepository;

  constructor() {
    this.postRepository = new PostsRepository();
  }

  async delete(id: string): Promise<void> {
    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new PostNotFound();
    }

    await this.postRepository.delete(id);
  }
}
