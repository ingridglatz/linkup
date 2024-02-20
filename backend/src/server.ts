import express from "express";
import multer from "multer";
import { CreatePostController } from "./controllers/posts/create-post-contoller/create-post-controller";
import { CreateUserController } from "./controllers/users/create-user-controller";
import { DeletePostController } from "./controllers/posts/delete-post-controller/delete-post-controller";
import { DeleteUserController } from "./controllers/users/delete-user-controller";
import { ReadAllPostsController } from "./controllers/posts/read-all-posts/read-all-posts-controller";
import { ReadAllUsersController } from "./controllers/users/read-all-users-controller";
import { ReadPostController } from "./controllers/posts/read-post-controller/read-post-controller";
import { ReadUserController } from "./controllers/users/read-user-controller";
import { UpdatePostController } from "./controllers/posts/update-post-controller/update-post-controller";
import { UpdateUserController } from "./controllers/users/update-user-controller";
import { UploadUserAvatarController } from "./controllers/users/upload-user-avatar-controller";

const upload = multer({ dest: "uploads/" });

const app = express();

app.use(express.json());
app.use(express.static("uploads"));

// users
const createUserController = new CreateUserController();
app.post("/users", createUserController.handle.bind(createUserController));

const updateUserController = new UpdateUserController();
app.put("/users/:id", updateUserController.handle.bind(updateUserController));

const deleteUserController = new DeleteUserController();
app.delete(
  "/users/:id",
  deleteUserController.handle.bind(deleteUserController)
);

const readUserController = new ReadUserController();
app.get("/users/:id", readUserController.handle.bind(readUserController));

const readAllUsersController = new ReadAllUsersController();
app.get("/users", readAllUsersController.handle.bind(readAllUsersController));

const uploadUserAvatarController = new UploadUserAvatarController();
app.post(
  "/users/:id/avatar",
  upload.single("avatar"),
  uploadUserAvatarController.handle.bind(uploadUserAvatarController)
);

// posts
const createPostController = new CreatePostController();
app.post(
  "/users/:author/posts",
  upload.array("medias"),
  createPostController.handle.bind(createPostController)
);

const updatePostController = new UpdatePostController();
app.put(
  "/posts/:id",
  upload.array("medias"),
  updatePostController.handle.bind(updatePostController)
);

const deletePostController = new DeletePostController();
app.delete(
  "/posts/:id",
  deletePostController.handle.bind(deletePostController)
);

const readPostController = new ReadPostController();
app.get("/posts/:id", readPostController.handle.bind(readPostController));

const readAllPostsController = new ReadAllPostsController();
app.get(
  "/users/:author/posts",
  readAllPostsController.handle.bind(readAllPostsController)
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
