import { UserNotFound } from "../../../exceptions/user-not-found";
import { ReadAllPostsController } from "./read-all-posts-controller";

describe("ReadAllPostsController", () => {
  let sut: ReadAllPostsController;
  let readAllPostsUseCase: any;
  let request: any;
  let response: any;

  beforeEach(() => {
    sut = new ReadAllPostsController();
    readAllPostsUseCase = { read: jest.fn().mockResolvedValue([]) } as any;

    (sut as any).readAllPostsUseCase = readAllPostsUseCase;

    request = {
      params: {
        author: "any_author",
      },
    };

    response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
  });

  it("should be defined", () => {
    expect(sut).toBeDefined();
  });

  it("should call readAllPostsUseCase.read with correct params", async () => {
    await sut.handle(request, response);

    expect(readAllPostsUseCase.read).toHaveBeenCalledWith("any_author");
  });

  it("should return 200 on success", async () => {
    await sut.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({ posts: [] });
  });

  it("should return 404 if readAllPostsUseCase.read throws UserNotFound", async () => {
    readAllPostsUseCase.read.mockRejectedValueOnce(new UserNotFound());

    await sut.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({ error: "User not found" });
  });

  it("should return 500 if readAllPostsUseCase.read throws", async () => {
    readAllPostsUseCase.read.mockRejectedValueOnce(new Error());

    await sut.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      error: "Internal server error",
    });
  });
});
