const { db } = require("./db/connection");
const app = require("./src/app");
const { PORT } = process.env;

const init = async () => {
  try {
    await db.sync();
    app.listen(PORT || 8080, async () => {
      console.log(
        `App server is listening on port: http://localhost:${PORT || 8080}`
      );
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

init();
