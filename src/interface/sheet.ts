import { Request } from "express"
import { sheets_v4 } from "googleapis"

type ITitle = "Song" | "Difficulty" | "Clear" | "Score" | "Pure" | "Far" | "Miss" | "Shiny" | "cc" | "Rating"

interface ISheetRequest extends Request {
    googleSheet?: sheets_v4.Sheets
}

export { ITitle, ISheetRequest }