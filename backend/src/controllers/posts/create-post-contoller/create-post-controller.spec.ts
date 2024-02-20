import { CreatePostController } from "./create-post-controller";

jest.mock("fs/promises", () => ({
  rm: jest.fn(),
}));

describe("CreatePostController", () => {
  let sut: CreatePostController;
  let createPostUseCase: any;
  let request: any;
  let response: any;

  beforeEach(() => {
    sut = new CreatePostController();
    createPostUseCase = { create: jest.fn() } as any;

    (sut as any).createPostUseCase = createPostUseCase;
    request = {
      params: {
        author: "any_author",
      },
      body: {
        text: "any_text",
      },
      files: [
        {
          filename: "any_filename",
        },
      ],
    };
    response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should be defined", () => {
    expect(sut).toBeDefined();
  });

  it("should call createPostUseCase.create with correct params", async () => {
    await sut.handle(request, response);

    expect(createPostUseCase.create).toHaveBeenCalledWith({
      text: "any_text",
      medias: ["any_filename"],
      author: "any_author",
    });
  });

  it("should return 201 with post on success", async () => {
    createPostUseCase.create.mockResolvedValueOnce({
      id: "any_id",
      text: "any_text",
      medias: ["any_filename"],
      author: "any_author",
    });

    await sut.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({
      id: "any_id",
      text: "any_text",
      medias: ["any_filename"],
      author: "any_author",
    });
  });

  it("should return 500 with error message on failure", async () => {
    createPostUseCase.create.mockRejectedValueOnce(new Error("any_error"));

    await sut.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      error: "Internal server error",
    });
  });
});
