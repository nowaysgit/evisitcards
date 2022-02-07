import express from 'express';
import controller from '../controllers/UserAppController'
import AuthMiddleware from "../middleware/AuthMiddleware";

const router = express.Router();

router.post('/create', AuthMiddleware, controller.Create)
router.delete('/delete', AuthMiddleware, controller.Delete)
router.post('/update', AuthMiddleware, controller.Update)
router.get('/', controller.GetAll)
router.get('/:id', controller.GetById)

export default router