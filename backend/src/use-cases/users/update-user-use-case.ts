import { UserNotFound } from "../../exceptions/user-not-found";
import { UserRepository } from "../../repositories/user-repository";

type UpdateUserParams = {
  id: string;
  name: string;
  photo?: string;
};

type UpdateUserResponse = {
  id: string;
  name: string;
  email: string;
  photo?: string;
};

export class UpdateUserUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async update(params: UpdateUserParams): Promise<UpdateUserResponse> {
    const { id, name, photo } = params;

    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new UserNotFound();
    }

    const user = await this.userRepository.update({ id, name, photo });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
    };
  }
}
