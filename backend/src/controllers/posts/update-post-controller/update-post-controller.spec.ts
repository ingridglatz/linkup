import { UpdatePostController } from "./update-post-controller";

jest.mock("fs/promises", () => ({ rm: jest.fn() }));

describe("UpdatePostController", () => {
  let sut: UpdatePostController;
  let updatePostUseCase: any;
  let request: any;
  let response: any;

  beforeEach(() => {
    sut = new UpdatePostController();
    updatePostUseCase = { update: jest.fn() } as any;

    (sut as any).updatePostUseCase = updatePostUseCase;

    request = {
      params: {
        id: "any_id",
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
      send: jest.fn(),
      json: jest.fn(),
    };
  });

  it("should be defined", () => {
    expect(sut).toBeDefined();
  });

  it("should call updatePostUseCase.update with correct params", async () => {
    await sut.handle(request, response);

    expect(updatePostUseCase.update).toHaveBeenCalledWith({
      id: "any_id",
      text: "any_text",
      medias: ["any_filename"],
    });
  });

  it("should return 200 on success", async () => {
    updatePostUseCase.update.mockResolvedValueOnce({
      id: "any_id",
      text: "any_text",
      medias: ["any_filename"],
    });

    await sut.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(200);

    expect(response.json).toHaveBeenCalledWith({
      id: "any_id",
      text: "any_text",
      medias: ["any_filename"],
    });
  });

  it("should return 500 if updatePostUseCase.update throws", async () => {
    updatePostUseCase.update.mockRejectedValueOnce(new Error());

    await sut.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({
      error: "Internal server error",
    });
  });
});
