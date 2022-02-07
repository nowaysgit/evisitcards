import express from 'express';
import UserRoute from "./UserRoute";
import ServiceRoute from "./AppRoute";
import UserAppRoute from "./UserAppRoute";


const router = express.Router();

router.use('/user', UserRoute)
router.use('/service', ServiceRoute)
router.use('/user-app', UserAppRoute)

export default router