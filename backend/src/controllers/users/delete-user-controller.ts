import assert from "assert";
import { Request, Response } from "express";
import { UserNotFound } from "../../exceptions/user-not-found";
import { DeleteUserUseCase } from "../../use-cases/users/delete-user-use-case";

export class DeleteUserController {
  private deleteUserUseCase: DeleteUserUseCase;

  constructor() {
    this.deleteUserUseCase = new DeleteUserUseCase();
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params;

      await this.deleteUserUseCase.delete(id);

      return response.status(204).send();
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
