import { Router } from "express";
import { update, getSheetData } from "../controller/sheet";
import { getSheetMiddleware } from "../middleware/sheet";

const sheetRouter = Router()

sheetRouter.get("/get/:id", getSheetMiddleware, getSheetData)
sheetRouter.post("/update/:id", getSheetMiddleware, update)

export { sheetRouter }