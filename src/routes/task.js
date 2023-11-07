const { Task } = require("../models");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    console.log(error);
  }
});

//get tasks by id

router.get("/:userId", async (req, res, next) => {
  try {
    const task = await Task.findByPk(req.params.userId, {
      include: [{ model: Page }],
    });

    if (!task) {
      res.status(404);
      next();
    } else {
      res.send(task);
    }
  } catch (error) {
    next(error);
  }
});

//post tasks
router.post("/create", async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
});

//update tasks

router.put("/:id", async (req, res, next) => {
  try {
    const updatedUser = await Task.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedUser == 0) {
      throw new Error("No task update!");
    }
    const userUpdate = await Task.findByPk(req.body.id);
    res.send(userUpdate);
    res.status(200);
  } catch (error) {
    next(error);
  }
});

//delete tasks
router.delete("/:id", async (req, res) => {
  try {
    await Task.destroy({
      where: {
        id: req.params.id,
      },
    });
    const tasks = await Task.findAll();
    res.send(tasks);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
