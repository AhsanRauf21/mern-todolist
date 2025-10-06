import mongoose from "mongoose";
import UserModel from "./models/user.model.js";
import { Router } from "express";
import TaskModel from "./models/task.model.js";

const router = Router();

router.post("/register", async (req, res) => {
  try {
    if (!req.body) throw new Error("Enter Data");

    const { name, email, password } = req.body;
    if (!name) throw new Error("Enter name");
    if (!email) throw new Error("Enter email");
    if (!password) throw new Error("Enter password");

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) throw new Error("User is already resgistered");

    const user = await UserModel.create({
      name,
      email,
      password,
    });

    res
      .status(200)
      .send({ message: "Registration Successful", token: user._id });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    if (!req.body) throw new Error("Enter Data");
    const { email, password } = req.body;

    if (!email) throw new Error("Enter email");
    if (!password) throw new Error("Enter password");

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) throw new Error("User not exist");

    if (existingUser.password !== password) throw new Error("Invalid Password");

    res
      .status(200)
      .send({ message: "User login successful", token: existingUser._id });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.use((req, res, next) => {
  try {
    const token = req.headers["user"];
    if (!token) throw new Error("Login First");

    if (!mongoose.isValidObjectId(token)) throw new Error("User don't exists");

    req.user = token;

    next();
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router.get("/profile", async (req, res) => {
  try {
    const user = await UserModel.findById(req.user).select("-password");

    return res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

router
  .post("/", async (req, res) => {
    try {
      if (!req.body) throw new Error("Enter Data");

      const { task } = req.body;

      if (!task) throw new Error("Add Task");

      await TaskModel.create({
        task,
        user: req.user,
      });

      res.status(200).send({ message: "Task Added Successfully" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  })
  .get("/", async (req, res) => {
    try {
      const user = await TaskModel.find({ user: req.user });
      if (!user) throw new Error("User doesn't exist");
      res.status(200).send(user);
    } catch (error) {
      res.status(400).send({ message: error.message });
      console.log(error);
    }
  });

router
  .get("/:id", async (req, res) => {
    try {
      const id = req.params.id;

      const task = await TaskModel.findById(id);

      res.status(200).send(task);
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  })
  .delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;

      const task = await TaskModel.findByIdAndDelete(id);

      if (!task) throw new Error("No task to delete");

      res.status(200).send({ message: "Task Deleted" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  })
  .put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const { task } = req.body;

      if (!task) throw new Error("No task to update");

      await TaskModel.findByIdAndUpdate(id, {
        task,
      });

      res.status(200).send({ message: "Task successfully Updated" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  });

export default router;
