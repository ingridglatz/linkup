import { EmailAlreadyExists } from "../../exceptions/email-already-exists";
import { UserRepository } from "../../repositories/user-repository";

type CreateUserParams = {
  name: string;
  email: string;
  photo?: string;
};

type CreateUserResponse = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

export class CreateUserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(params: CreateUserParams): Promise<CreateUserResponse> {
    const { email, name, photo } = params;

    const alreadyEmailExists = await this.userRepository.findByEmail(email);

    if (alreadyEmailExists) {
      throw new EmailAlreadyExists();
    }

    const user = await this.userRepository.create({ email, name, photo });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
    };
  }
}
