import * as fs from "fs/promises";

import { UserNotFound } from "../../exceptions/user-not-found";
import { UserRepository } from "../../repositories/user-repository";

type UploadParams = {
  userId: string;
  avatarFile: string;
};

export class UploadUserAvatarUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute({ userId, avatarFile }: UploadParams): Promise<void> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new UserNotFound();
    }

    if (user.photo) {
      await fs.rm(`./uploads/${user.photo}`);
    }

    await fs.rename(`./uploads/${avatarFile}`, `./uploads/${userId}.jpg`);
    user.photo = `${userId}.jpg`;

    await this.userRepository.update(user);
  }
}
