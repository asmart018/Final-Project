import express from "express";
import * as users from "../controllers/users.controller";
import { join } from "path";

const router = express.Router();

router.get("/:id?", async (req, res, next) => {
  try {
    let id = req.params["id"];
    let user;
    let message;
    if (id) {
      user = await users.findOneById(id);
      message = "user " + user[0].name;
    } else {
      user = await users.findAll();
      message = "all users";
    }
    req.session.user = user;
    return res.render(join(__dirname, "../public/orderView.html"), {
      user: req.session.user,
      message: message,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const order_id = req.body.order_id;
    const shipped = req.body.shipped;
    await users.updateOrder(order_id, shipped);
    res.redirect(303, "../");
  } catch (err) {
    next(err);
  }
});

router.delete("/id", async (req, res, next) => {
  try {
    const user_id = req.params.id;
    await users.deleteUserOrders(user_id);
    await users.deleteUser(user_id);
    res.redirect(303, "../");
  } catch (err) {
    next(err);
  }
});

export default router;
