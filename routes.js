import { Router, json } from "express";
import { createRec, indexRec } from "./controllers/recordController.js";
import { createClipe, indexClipe } from "./controllers/clipsController.js";
const router = Router();
router.use(json())


router.get("/rec", indexRec)
      .post("/rec", createRec)

router.get("/clipe", indexClipe)
      .post("/clipe", createClipe)

export default router;