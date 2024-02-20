import assert from "assert";
import { Request, Response } from "express";
import { UserNotFound } from "../../exceptions/user-not-found";
import { ReadUserUseCase } from "../../use-cases/users/read-user-use-case";

export class ReadUserController {
  private readUserUseCase: ReadUserUseCase;

  constructor() {
    this.readUserUseCase = new ReadUserUseCase();
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      const user = await this.readUserUseCase.read(id);

      return response.status(200).json({ ...user });
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
