import { UserRepository } from "../../repositories/user-repository";

type ReadAllUsersResponse = {
  id: string;
  name: string;
  email: string;
  photo?: string;
}[];

export class ReadAllUsersUseCase {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async read(): Promise<ReadAllUsersResponse> {
    const users = await this.userRepository.findAll();
    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      photo: user.photo,
    }));
  }
}
