import * as fs from "fs/promises";
import { PostNotFound } from "../../exceptions/post-not-found";
import { PostsRepository } from "../../repositories/posts-repository";

type UpdatePostParams = {
  id: string;
  text: string;
  medias?: string[];
};

type UpdatePostResponse = {
  id: string;
  text: string;
  medias?: string[];
};

export class UpdatePostUseCase {
  private postRepository: PostsRepository;

  constructor() {
    this.postRepository = new PostsRepository();
  }

  async update(params: UpdatePostParams): Promise<UpdatePostResponse> {
    const { id, text, medias } = params;

    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new PostNotFound();
    }

    if (post.medias) {
      const promises = post.medias.map(
        async (media) => await fs.rm(`./uploads/${media}`)
      );

      await Promise.all(promises);
    }

    await this.postRepository.update({ id, text, medias });

    return {
      id: post.id,
      text: post.text,
      medias: post.medias,
    };
  }
}
