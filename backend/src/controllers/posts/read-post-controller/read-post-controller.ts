import { Request, Response } from "express";
import { PostNotFound } from "../../../exceptions/post-not-found";
import { ReadPostUseCase } from "../../../use-cases/posts/read-post-use-case";

export class ReadPostController {
  private readPostUseCase: ReadPostUseCase;

  constructor() {
    this.readPostUseCase = new ReadPostUseCase();
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const post = await this.readPostUseCase.read(id);

      return response.status(200).json({ ...post });
    } catch (error) {
      if (error instanceof PostNotFound) {
        return response.status(404).json({ error: error.message });
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
