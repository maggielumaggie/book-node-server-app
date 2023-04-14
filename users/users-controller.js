// import users from "./users.js";
import * as usersDao from "./users-dao.js";
import bcrypt from 'bcrypt';
const saltRounds = 10;

// let currentUser = null;

function UsersController(app) {
  const findAllUsers = async (req, res) => {
    const users = await usersDao.findAllUsers();
    res.send(users);
  };
  const findUserById = async (req, res) => {
    const id = req.params.id;
    const user = await usersDao.findUserById(id);
    res.send(user);
  };
  const deleteUserById = async (req, res) => {
    const id = req.params.id;
    const status = await usersDao.deleteUser(id);
    res.json(status);
  };
  const createUser = async (req, res) => {
    const user = await usersDao.createUser(req.body);
    res.json(user);
  };
  const updateUser = async (req, res) => {
    const id = req.params.id;
    const status = await usersDao.updateUser(id, req.body);
    res.json(status);
  };
  const login = async (req, res) => {
    const user = req.body;
    const username = user.username;
    const password = user.password;
    const foundUser = await usersDao.findUserByCredentials(
        req.body.username,
        req.body.password
    );
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
      foundUser.password = '*****';
      req.session["currentUser"] = foundUser;
      res.json(foundUser);
    } else {
      res.sendStatus(404);
    }
  };
  const logout = async (req, res) => {
    req.session.destroy();
    res.sendStatus(204);
  };
  const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (currentUser) {
      res.send(currentUser);
    } else {
      res.sendStatus(404);
    }
  };
  const register = async (req, res) => {
    const user = req.body;
    const password = user.password;
    const hash = await bcrypt.hash(password, saltRounds);
    user.password = hash;

    const foundUser = await usersDao.findUserByUsername(req.body.username);
    if (foundUser) {
      res.sendStatus(409);
      return;
    } else {
      const newUser = await usersDao.createUser(user);
      newUser.password = '*****';
      req.session["currentUser"] = newUser;
      res.json(newUser);
    }
  };

  app.post("/api/users/login", login);
  app.post("/api/users/logout", logout);
  app.get("/api/users/profile", profile);
  app.post("/api/users/register", register);

  app.get("/api/users", findAllUsers);
  app.get("/api/users/:id", findUserById);
  app.delete("/api/users/:id", deleteUserById);
  app.post("/api/users", createUser);
  app.put("/api/users/:id", updateUser);
}

export default UsersController;
