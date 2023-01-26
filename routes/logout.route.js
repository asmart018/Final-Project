import express from "express";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    req.session.destroy((err) => {
      res.redirect("/");
    });
  } catch (err) {
    next(err);
  }
});

export default router;
