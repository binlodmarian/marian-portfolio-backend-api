import { Router } from "express";
import * as taskController from "../controllers/task.controller";
import { requireAuth } from "../middlewares/requireAuth";
const router = Router();
router.use(requireAuth);
router.post("/", taskController.createTask);
router.get("/", taskController.getTasks);
router.get("/:id", taskController.getTaskById);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);
export default router;
//# sourceMappingURL=task.routes.js.map