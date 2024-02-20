import { Request, Response } from "express";
import { DeletePostUseCase } from "../../../use-cases/posts/delete-post-use-case";

export class DeletePostController {
  private deletePostUseCase: DeletePostUseCase;

  constructor() {
    this.deletePostUseCase = new DeletePostUseCase();
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      await this.deletePostUseCase.delete(id);

      return response.status(204).send();
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Post not found" });
    }
  }
}
