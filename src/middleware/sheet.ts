import { NextFunction, Response } from "express";
import { ISheetRequest } from "../interface/sheet";
import { getSheetClient } from "../helper/sheet";

const getSheetMiddleware = async (req: ISheetRequest, res: Response, next: NextFunction) => {
    const sheetId = req.params.id
    if (!sheetId) return res.status(400).json({ message: "No sheet id provided" })
    try {
        const googleSheet = getSheetClient(sheetId)
        await googleSheet.spreadsheets.get()
        req.googleSheet = googleSheet
        next()
    } catch (error) {
        return res.status(400).json({ message: "Sheet id is invalid, please check if the service bot has permission in this sheet" })
    }
}

export { getSheetMiddleware }