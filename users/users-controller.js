
import * as dao from "./users-dao.js";
import bcrypt from 'bcrypt';
const saltRounds = 10;


function UsersController(app) {
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.send(users);
  };
  const findUserById = async (req, res) => {
    const uid = req.params.uid
    const user = await dao.findUserById(uid);
    if (user) {
      res.json(user)
      return
    }
    res.sendStatus(404)
  };
  const deleteUserById = async (req, res) => {
    const uid = req.params.uid
    const status = await dao.deleteUser(uid);
    res.json(status);
  };
  const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };
  const updateUser = async (req, res) => {
    const uid = req.params.uid
    const status = await dao.updateUser(uid, req.body);
    res.json(status);
  };
  const login = async (req, res) => {
    const user = req.body;
    const username = user.username;
    const password = user.password;
    const foundUser = await dao.findUserByCredentials(
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

    const foundUser = await dao.findUserByUsername(req.body.username);
    if (foundUser) {
      res.sendStatus(409);
      return;
    } else {
      const currentUser = await dao.createUser(user);
      currentUser.password = '*****';
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    }
  };

  app.get('/users', findAllUsers)
  app.get('/users/:uid', findUserById)
  app.post('/users', createUser)
  app.put('/users/:uid', updateUser)
  app.delete('/users/:uid', deleteUserById)

  app.post('/register', register)
  app.post('/login', login)
  app.post('/logout', logout)
  app.post('/profile', profile)
}

export default UsersController;
