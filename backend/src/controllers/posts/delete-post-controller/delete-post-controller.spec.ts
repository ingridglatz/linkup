import { DeletePostController } from "./delete-post-controller";

describe("DeletePostController", () => {
  let sut: DeletePostController;
  let deletePostUseCase: any;
  let request: any;
  let response: any;

  beforeEach(() => {
    sut = new DeletePostController();
    deletePostUseCase = { delete: jest.fn() } as any;

    (sut as any).deletePostUseCase = deletePostUseCase;

    request = {
      params: {
        id: "any_id",
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

  it("should call deletePostUseCase.delete with correct params", async () => {
    await sut.handle(request, response);

    expect(deletePostUseCase.delete).toHaveBeenCalledWith("any_id");
  });

  it("should return 204 on success", async () => {
    await sut.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(204);
    expect(response.send).toHaveBeenCalled();
  });

  it("should return 500 if deletePostUseCase.delete throws", async () => {
    deletePostUseCase.delete.mockRejectedValueOnce(new Error());

    await sut.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(500);
    expect(response.json).toHaveBeenCalledWith({ error: "Post not found" });
  });
});
