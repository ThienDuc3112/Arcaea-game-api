import { Router } from "express";
import { update, test } from "../controller/sheet";
import { getSheetMiddleware } from "../middleware/sheet";

const sheetRouter = Router()

sheetRouter.get("/get/:id", getSheetMiddleware, test)
sheetRouter.post("/update/:id", getSheetMiddleware, update)

export { sheetRouter }