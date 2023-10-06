import { Router } from "express";
import { getCrop, getJacket, getPixelatedJacket, getSong, rootController } from "../controller/util";
import { getSongMiddleware, randomSongMiddleware } from "../middleware/util";


const utilRouter = Router()

// Get song
utilRouter.get("/", rootController)
utilRouter.get("/randomsong", randomSongMiddleware, getSong)

// Get Jacket
utilRouter.get("/jacket", randomSongMiddleware, getJacket)
utilRouter.get("/jacket/:id", getSongMiddleware, getJacket)

//Get pixelated
utilRouter.get("/pixelated", randomSongMiddleware, getPixelatedJacket)
utilRouter.get("/pixelated/:id", getSongMiddleware, getPixelatedJacket)
utilRouter.get("/pixelated/:id/:pixel", getSongMiddleware, getPixelatedJacket)

// Get cropped jacket
utilRouter.get("/crop", randomSongMiddleware, getCrop)
utilRouter.get("/crop/:id", getSongMiddleware, getCrop)
utilRouter.get("/crop/:id/:width", getSongMiddleware, getCrop)
utilRouter.get("/crop/:id/:width/:height", getSongMiddleware, getCrop)

export { utilRouter }