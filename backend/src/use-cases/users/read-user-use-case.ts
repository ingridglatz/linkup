import { UserNotFound } from "../../exceptions/user-not-found";
import { UserRepository } from "../../repositories/user-repository";

type ReadUserResponse = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

export class ReadUserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async read(id: string): Promise<ReadUserResponse> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFound();
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
    };
  }
}
