import express from 'express';
import { registerUser, loginUser } from '../controllers/userController.js';
import upload from '../middlewares/multer.js';
import authUser from '../middlewares/authUser.js';
import { addProject, myProjects } from '../controllers/projectController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.post('/add-project', authUser, upload.single('thumbnail'), addProject);
userRouter.get('/my-projects', authUser, myProjects);

export default userRouter;