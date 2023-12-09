import { Router, json } from "express";
import { createRec, dateNow, dateNowList, getCourtWhenHaveVideoInDay, getCourtWhenHaveVideoInDayAndHour, getVideo, getVideoByDay, getVideoByDayAllCourts, getVideoByDayAndHour, getVideoCountByCourtAndHour as getClipCountByGame, indexRec, saveVideo} from "./controllers/recordController.js";
import { createClipe, indexClipe } from "./controllers/clipsController.js";
import upload from "./middleware/clipesStore.js";
const router = Router();
router.use(json())


router.get("/rec", indexRec)
      .post("/rec", createRec)

router.get("/clipe", indexClipe)
      .post("/clipe", createClipe)

router.get("/dateNow/:court", dateNow)
      .get("/list/:courtId", dateNowList) 
      .post("/up/:dateNowId",upload.single('video'), saveVideo)
      .get("/video/:courtId", getVideo)
      .get("/videoDay/:courtId/", getVideoByDay)
      .post("/videoHour/:courtId", getVideoByDayAndHour)
      .get("/haveCourtDay/", getCourtWhenHaveVideoInDay)
      .get("/haveCourtHour/", getCourtWhenHaveVideoInDayAndHour)
      .post ("/allVideoDay/",getVideoByDayAllCourts)
      .post("/clipCountByGame", getClipCountByGame)

export default router;