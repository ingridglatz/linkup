import assert from "assert";
import { Request, Response } from "express";
import { EmailAlreadyExists } from "../../exceptions/email-already-exists";
import { CreateUserUseCase } from "../../use-cases/users/create-user-use-case";

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor() {
    this.createUserUseCase = new CreateUserUseCase();
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { email, name, photo } = request.body;

      const user = await this.createUserUseCase.create({ email, name, photo });

      return response.status(201).json({ ...user });
    } catch (error) {
      this.isError(error);

      if (this.isEmailAlreadyExists(error)) {
        return response.status(400).json({ error: error.message });
      }

      return response.status(500).json({ error: "Internal server error" });
    }
  }

  private isError(error: unknown): asserts error is Error {
    assert(error instanceof Error);
  }

  private isEmailAlreadyExists(error: unknown): error is EmailAlreadyExists {
    return (
      typeof error == "object" &&
      error?.constructor.name == EmailAlreadyExists.name
    );
  }
}
