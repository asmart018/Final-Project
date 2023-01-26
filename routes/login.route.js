import express from "express";
import * as users from "../controllers/users.controller";
import { compareSync } from "bcryptjs";
import { join } from "path";

const router = express.Router();

let sessionStored;

router.get("/", async (req, res, next) => {
  try {
    if (res.locals.name) {
      res.render(join(__dirname, "../public/homePage.html"), {
        name: res.locals.name,
        message: "Currently logged in as ",
      });
    }
    res.render(join(__dirname, "../public/login.html"));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await users.findOneUser(email);

    if (user.length < 1) {
      return res.render(join(__dirname, "../public/login.html"), {
        message: "Invalid email or password",
        messageClass: "danger",
      });
    } else {
      const isValidPassword = compareSync(password, user[0].password);
      if (isValidPassword) {
        sessionStored = req.session;
        sessionStored.userId = user[0].user_id;
        sessionStored.name = user[0].name;
        sessionStored.admin = user[0].admin;
        req.session.save();
        if (sessionStored.admin == 1) {
          return res.redirect("/admin");
        }

        let order = await users.findOne(email);
        return res.render(join(__dirname, "../public/orderView.html"), {
          user: order,
          message: "user " + order[0].name,
        });
      } else {
        return res.render(join(__dirname, "../public/login.html"), {
          message: "Invalid email or password",
          messageClass: "danger",
        });
      }
    }
  } catch (err) {
    next(err);
  }
});

export default router;
