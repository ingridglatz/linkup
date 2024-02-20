import assert from "assert";
import { Request, Response } from "express";
import { UserNotFound } from "../../exceptions/user-not-found";
import { UpdateUserUseCase } from "../../use-cases/users/update-user-use-case";

export class UpdateUserController {
  private updateUserUseCase: UpdateUserUseCase;

  constructor() {
    this.updateUserUseCase = new UpdateUserUseCase();
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;
      const { name, photo } = request.body;

      const user = await this.updateUserUseCase.update({ id, name, photo });

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
