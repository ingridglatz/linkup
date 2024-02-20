import * as fs from "fs/promises";
import assert from "assert";
import { Request, Response } from "express";
import { UserNotFound } from "../../exceptions/user-not-found";
import { UploadUserAvatarUseCase } from "../../use-cases/users/upload-user-avatar-use-case";

export class UploadUserAvatarController {
  private uploadUserAvatar: UploadUserAvatarUseCase;

  constructor() {
    this.uploadUserAvatar = new UploadUserAvatarUseCase();
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const avatarFile = request.file?.filename;

    try {
      if (!avatarFile) {
        return response.status(400).json({ error: "Avatar file is required" });
      }

      await this.uploadUserAvatar.execute({ userId: id, avatarFile });

      return response.status(204).send();
    } catch (error) {
      console.error(error);
      this.isError(error);

      await fs.rm(`./uploads/${avatarFile}`);

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
