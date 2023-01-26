import query from "../db/index";

export const findAll = async () => {
  return await query(
    "SELECT u.user_id, CONCAT(u.first_name, ' ', u.last_name) AS name, u.address, u.phone_number, u.email, o.order_id, o.quantity, o.cost, o.shipped FROM users AS u INNER JOIN orders AS o ON u.user_id = o.user_id"
  );
};

export const findOneUser = async (email) => {
  return await query(
    "SELECT u.user_id, CONCAT(u.first_name, ' ', u.last_name) AS name, u.address, u.phone_number, u.email, u.password, u.admin FROM users AS u WHERE u.email = ?",
    [email]
  );
};

export const findOne = async (email) => {
  return await query(
    "SELECT u.user_id, CONCAT(u.first_name, ' ', u.last_name) AS name, u.address, u.phone_number, u.email, o.order_id, o.quantity, o.cost, o.shipped FROM users AS u INNER JOIN orders AS o ON u.user_id = o.user_id WHERE u.email = ?",
    [email]
  );
};

export const findOneById = async (id) => {
  return await query(
    "SELECT u.user_id, CONCAT(u.first_name, ' ', u.last_name) AS name, u.address, u.phone_number, u.email, o.order_id, o.quantity, o.cost, o.shipped FROM users AS u INNER JOIN orders AS o ON u.user_id = o.user_id WHERE u.user_id = ?",
    [id]
  );
};

export const newUser = async (
  first_name,
  last_name,
  address,
  phone_number,
  email,
  password
) => {
  return await query(
    "INSERT INTO users (first_name, last_name, address, phone_number, email, password) VALUES (?, ?, ?, ?, ?, ?)",
    [first_name, last_name, address, phone_number, email, password]
  );
};

export const updateOrder = async (order_id, shipped) => {
  return await query("UPDATE orders SET shipped = ? WHERE order_id = ?", [
    shipped,
    order_id,
  ]);
};

export const deleteUserOrders = async (user_id) => {
  return await query("DELETE FROM orders WHERE user_id = ?", [user_id]);
};

export const deleteUser = async (user_id) => {
  return await query("DELETE FROM users WHERE user_id = ?", [user_id]);
};
