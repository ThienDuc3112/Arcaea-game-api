import { Response } from "express";
import { ISheetRequest, ITitle } from "../interface/sheet";


const test = async (req: ISheetRequest, res: Response) => {
    const googleSheets = req.googleSheet
    if (!googleSheets) return res.status(500).json({ message: "Internal server error happened" })
    const getRows = await googleSheets.spreadsheets.values.get({ range: "Score dump" })
    const data = getRows.data.values?.filter(data => data.length > 0 && data[0] != "")
    if (!data) return res.status(404).json({ message: "No 'Score dump' sheet found in the spreadsheet" })
    if (data.length <= 1) return res.status(404).json({ message: "No data in 'Score dump' sheet" })
    const dataJSON = data.slice(1).map(element => {
        let song: Record<ITitle, string> = {
            Song: "",
            Difficulty: "",
            Clear: "",
            Score: "",
            Pure: "",
            Far: "",
            Miss: "",
            Shiny: "",
            cc: "",
            Rating: ""
        };
        data[0].forEach((title: ITitle, index) => {
            song[title] = element[index]
        })
        return song;
    })
    res.json(dataJSON)
}

const update = async (req: ISheetRequest, res: Response) => {
    const googleSheets = req.googleSheet
    if (!googleSheets) return res.status(500).json({ message: "Internal server error happened" });

    const { title, difficulty, clear, score, pure, far, loss } = req.body
    if (!title || !difficulty || !score) return res.status(400).json({ message: "Need to provide title, difficulty and score" })

    const getRows = await googleSheets.spreadsheets.values.get({ range: "Score dump" })
    const data = getRows.data.values?.filter(score => score[0] != "")
    if (!data) return res.status(404).json({ message: "No 'Score dump' sheet found in the spreadsheet" })
    if (data.length <= 1) return res.status(404).json({ message: "No data in 'Score dump' sheet" })


    try {
        const index = data.findIndex(score => score[0].toLowerCase() == title.toLowerCase() && difficulty.toLowerCase() == score[1].toLowerCase())
        let range = `'Score dump'!${data.length + 1}:${data.length + 1}`
        if (index > 0) {
            range = `'Score dump'!${index + 1}:${index + 1}`
            let oldScore = parseInt(data[index][3])
            if (!isNaN(oldScore) && score < oldScore) {
                return res.status(400).json({ message: "Old score was higher" })
            }
        }
        const sheetRes = await googleSheets.spreadsheets.values.update({
            range,
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[title, difficulty, clear ?? "", score, pure ?? "", far ?? "", loss ?? ""]]
            }
        })
        res.json(sheetRes)
    } catch (error) {
        res.status(400).json({ message: "Invalid title" })
        return
    }
}

export { test, update }