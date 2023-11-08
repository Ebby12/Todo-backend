const { describe, it, expect, beforeAll, afterAll } = require("@jest/globals");
const { User, Task } = require("../models");
const { db } = require("../../db/connection");

// define in global scope
let user;

// clear db and create new User before tests
beforeAll(async () => {
  await db.sync({ force: true });
  user = await User.create({
    username: "Elsa",
    role: "Admin",
    password: "223220",
  });
});

// clear db after tests
afterAll(async () => await db.sync({ force: true }));

describe("User", () => {
  it("has all property", async () => {
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("username");
    expect(user).toHaveProperty("role");
    expect(user).toHaveProperty("password");
  });

  it("has correct property values assigned", () => {
    expect(user.username).toBe("Elsa");
    expect(user.role).toBe("Admin");
    expect(user.password).toBe("223220");
  });

  it("is created", async () => {
    const userIsFound = await User.findOne({
      where: {
        username: "Elsa",
      },
    });
    expect(user.toJSON()).toEqual(userIsFound.toJSON());
  });
});
