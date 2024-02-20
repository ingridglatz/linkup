import { ReadPostController } from "./read-post-controller";

describe("ReadPostController", () => {
  let sut: ReadPostController;
  let readPostUseCase: any;
  let request: any;
  let response: any;

  beforeEach(() => {
    sut = new ReadPostController();
    readPostUseCase = { read: jest.fn() } as any;

    (sut as any).readPostUseCase = readPostUseCase;

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

  it("should call readPostUseCase.read with correct params", async () => {
    await sut.handle(request, response);

    expect(readPostUseCase.read).toHaveBeenCalledWith("any_id");
  });

  it("should return 200 on success", async () => {
    readPostUseCase.read.mockResolvedValueOnce({
      id: "any_id",
      title: "any_title",
      content: "any_content",
    });

    await sut.handle(request, response);

    expect(response.status).toHaveBeenCalledWith(200);

    expect(response.json).toHaveBeenCalledWith({
      id: "any_id",
      title: "any_title",
      content: "any_content",
    });
  });
});
