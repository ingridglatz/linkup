import { Request, Response } from "express";
import { ReadAllUsersUseCase } from "../../use-cases/users/read-all-users-use-case";

export class ReadAllUsersController {
  private readAllUsersUseCase: ReadAllUsersUseCase;

  constructor() {
    this.readAllUsersUseCase = new ReadAllUsersUseCase();
  }

  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const users = await this.readAllUsersUseCase.read();

      return response.status(200).json({ users });
    } catch (error) {
      console.error(error);
      return response.status(500).json({ error: "Internal server error" });
    }
  }
}
