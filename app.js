import express from "express";
import cors from "cors";
import BooksController from "./books/books-controller.js";
import UsersController from "./users/users-controller.js";
import LikesController from "./likes/likes-controller.js";
import SessionController from "./session-controller.js";
import ReviewsController from "./reviews/reviews-controller.js";
import FollowsController from "./follows/follows-controller.js";
import mongoose from "mongoose";
import session from "express-session";

mongoose.connect("mongodb+srv://maggielu:maggieissmart@cluster0.cgt2jhs.mongodb.net/books?retryWrites=true&w=majority");


const app = express();
app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
);
app.use(express.json());
app.set('trust proxy', 1);
app.use(
    session({
      secret: "process.env.SECRET",
      resave: false,
      saveUninitialized: false,
      cookie: { secure: true }
    })
);

SessionController(app);
BooksController(app);
LikesController(app);
UsersController(app);
ReviewsController(app);
FollowsController(app);

app.listen(4000);