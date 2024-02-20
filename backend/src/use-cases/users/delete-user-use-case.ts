import { UserNotFound } from "../../exceptions/user-not-found";
import { UserRepository } from "../../repositories/user-repository";

export class DeleteUserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async delete(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    await this.userRepository.delete(id);
  }
}
