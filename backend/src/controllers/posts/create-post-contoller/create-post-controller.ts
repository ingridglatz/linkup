import * as fs from "fs/promises";
import { Request, Response } from "express";
import { CreatePostUseCase } from "../../../use-cases/posts/create-post-use-case";

export class CreatePostController {
  private createPostUseCase: CreatePostUseCase;

  constructor() {
    this.createPostUseCase = new CreatePostUseCase();
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const files = request.files as Express.Multer.File[];

    try {
      const { author } = request.params;
      const { text } = request.body;

      const medias = files?.map((file) => file.filename);

      const post = await this.createPostUseCase.create({
        text,
        medias,
        author,
      });

      return response.status(201).json(post);
    } catch (error) {
      console.error(error);

      if (files) {
        const promises = files.map(
          async (file) => await fs.rm(`./uploads/${file.filename}`)
        );
        await Promise.all(promises);
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
