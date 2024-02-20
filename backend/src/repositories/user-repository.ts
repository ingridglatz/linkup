import { PrismaClient } from "@prisma/client";
import { User } from "../domain/user";

type CreateParams = {
  email: string;
  name: string;
  photo?: string;
};

type UpdateParams = {
  id: string;
  name: string;
  photo?: string;
};

export class UserRepository {
  private prisma: PrismaClient;

  constructor() {
    console.log("user", process.env.DATABASE_URL);

    this.prisma = new PrismaClient({
      datasources: { db: { url: process.env.DATABASE_URL } },
    });
  }

  async connect() {
    await this.prisma.$connect();
  }

  async disconnect() {
    await this.prisma.$disconnect();
  }

  async findByEmail(email: string): Promise<User | null> {
    await this.connect();
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
    await this.disconnect();

    if (!user) {
      return null;
    }

    return new User({ ...user, photo: user.photo || undefined });
  }

  async findById(id: string): Promise<User | null> {
    await this.connect();
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });
    await this.disconnect();

    if (!user) {
      return null;
    }

    return new User({ ...user, photo: user.photo || undefined });
  }

  async findAll(): Promise<User[]> {
    await this.connect();
    const users = await this.prisma.user.findMany();
    await this.disconnect();

    return users.map(
      (user) => new User({ ...user, photo: user.photo || undefined })
    );
  }

  async create(params: CreateParams): Promise<User> {
    const { email, name, photo } = params;
    await this.connect();
    const user = await this.prisma.user.create({
      data: {
        email,
        name,
        photo,
      },
    });
    await this.disconnect();

    return new User({ ...user, photo: user.photo || undefined });
  }

  async update(params: UpdateParams): Promise<User> {
    const { id, name, photo } = params;
    await this.connect();
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        photo,
      },
    });
    await this.disconnect();

    return new User({ ...user, photo: user.photo || undefined });
  }

  async delete(id: string): Promise<void> {
    await this.connect();
    await this.prisma.user.delete({
      where: {
        id,
      },
    });
    await this.disconnect();
  }
}
