import { PrismaClient } from "@prisma/client";
import { Post } from "../domain/post";

type CreateParams = {
  text: string;
  medias?: string[];
  author: string;
};

export class PostsRepository {
  private prisma: PrismaClient;

  constructor() {
    console.log("post", process.env.DATABASE_URL);
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

  async findById(id: string): Promise<Post | null> {
    await this.connect();
    const post = await this.prisma.post.findFirst({
      where: {
        id,
      },
      include: {
        author: true,
      },
    });
    await this.disconnect();

    if (!post) {
      return null;
    }

    return new Post({
      ...post,
      medias: post.medias || undefined,
      author: post.author.id,
    });
  }

  async findByAuthor(author: string): Promise<Post[]> {
    await this.connect();
    const posts = await this.prisma.post.findMany({
      where: {
        author: {
          id: author,
        },
      },
      include: {
        author: true,
      },
    });
    await this.disconnect();

    return posts.map((post) => {
      return new Post({
        ...post,
        medias: post.medias || undefined,
        author: post.author.id,
      });
    });
  }

  async create({ text, medias, author }: CreateParams): Promise<Post> {
    await this.connect();
    const post = await this.prisma.post.create({
      include: {
        author: true,
      },
      data: {
        text,
        medias,
        author: {
          connect: {
            id: author,
          },
        },
      },
    });
    await this.disconnect();

    return new Post({
      ...post,
      medias: post.medias || undefined,
      author: post.author.id,
    });
  }

  async update({
    id,
    text,
    medias,
  }: {
    id: string;
    text: string;
    medias?: string[];
  }): Promise<Post> {
    await this.connect();
    const post = await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        text,
        medias,
      },
      include: {
        author: true,
      },
    });
    await this.disconnect();

    return new Post({
      ...post,
      medias: post.medias || undefined,
      author: post.author.id,
    });
  }

  async delete(id: string): Promise<void> {
    await this.connect();
    await this.prisma.post.delete({
      where: {
        id,
      },
    });
    await this.disconnect();
  }
}
