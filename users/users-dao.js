import usersModel from "./users-model.js";

export const findAllUsers = async () => {
  const users = await usersModel.find();
  return users;
};

export const findAllAuthors= async () => {
  const users = await usersModel.find({ role: "AUTHOR" });
  return users;
};

export const findAllAdmins= async () => {
  const users = await usersModel.find({ role: "ADMIN" });
  return users;
};

export const findAllByRole = async (role) => {
  const users = await usersModel.find({ role });
  return users;
};

export const findUserById = async (uid) => {
  const user = await usersModel.findById({user_id : uid}, {password: false});
  return user;
};

export const findUserByUsername = async (username) => {
  const user = await usersModel.findOne({ username });
  return user;
};

export const findUserByCredentials = async (username, password) => {
  const user = await usersModel.findOne({ username, password });
  return user;
};

export const deleteUser = async (uid) => {
  const status = await usersModel.deleteOne({ user_id: uid });
  return status;
};

export const createUser = async (user) => {
  const newUser = await usersModel.create(user);
  return newUser;
};

export const updateUser = async (uid, user) => {
  const status = await usersModel.updateOne({ user_id: uid }, user);
  return status;
};
