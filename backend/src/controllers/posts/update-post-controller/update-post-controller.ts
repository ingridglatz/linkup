import * as fs from "fs/promises";
import { Request, Response } from "express";
import { UpdatePostUseCase } from "../../../use-cases/posts/update-post-use-case";

export class UpdatePostController {
  private updatePostUseCase: UpdatePostUseCase;

  constructor() {
    this.updatePostUseCase = new UpdatePostUseCase();
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const files = request.files as Express.Multer.File[];

    try {
      const { id } = request.params;
      const { text } = request.body;

      const medias = files?.map((file) => file.filename);

      const post = await this.updatePostUseCase.update({ id, text, medias });

      return response.status(200).json(post);
    } catch (error) {
      console.error(error);

      const promises = files.map(
        async (file) => await fs.rm(`./uploads/${file.filename}`)
      );
      await Promise.all(promises);

      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
