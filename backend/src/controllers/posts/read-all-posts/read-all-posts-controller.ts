import assert from "assert";
import { Request, Response } from "express";
import { UserNotFound } from "../../../exceptions/user-not-found";
import { ReadAllPostsUseCase } from "../../../use-cases/posts/read-all-posts-use-case";

export class ReadAllPostsController {
  private readAllPostsUseCase: ReadAllPostsUseCase;

  constructor() {
    this.readAllPostsUseCase = new ReadAllPostsUseCase();
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { author } = request.params;
      const posts = await this.readAllPostsUseCase.read(author);

      return response.status(200).json({ posts });
    } catch (error) {
      this.isError(error);

      if (this.isUserNotFound(error)) {
        return response.status(404).json({ error: error.message });
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }

  private isError(error: unknown): asserts error is Error {
    assert(error instanceof Error);
  }

  private isUserNotFound(error: unknown): error is UserNotFound {
    return (
      typeof error == "object" && error?.constructor.name == UserNotFound.name
    );
  }
}
