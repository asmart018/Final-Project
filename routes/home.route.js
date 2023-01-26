import express from "express";
import { join } from "path";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    res.render(join(__dirname, "../public/homePage.html"), {
      name: res.locals.name,
      message: "Welcome, ",
    });
  } catch (err) {
    next(err);
  }
});

export default router;
