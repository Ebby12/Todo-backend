const { User } = require("../models");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

//get users by id

router.get("/:userId", async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      include: [{ model: Page }],
    });

    if (!user) {
      res.status(404);
      next();
    } else {
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
});

//post users
router.post("/create", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

//update users

router.put("/:id", async (req, res, next) => {
  try {
    const updatedUser = await User.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedUser == 0) {
      throw new Error("No user update!");
    }
    const userUpdate = await User.findByPk(req.body.id);
    res.send(userUpdate);
    res.status(200);
  } catch (error) {
    next(error);
  }
});

//delete users
router.delete("/:id", async (req, res) => {
  try {
    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    const users = await User.findAll();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
