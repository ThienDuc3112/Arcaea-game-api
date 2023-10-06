import { Request, Response } from "express"
import songList from "../public/songlist.json"
import { ISongRequest } from "../interface/util"
import { cropImage, getSongCanvas, pixelated, randomCrop, returnImage } from "../helper/util"

const rootController = (req: Request, res: Response) => {
    res.json(songList)
}

const getSong = (req: ISongRequest, res: Response) => {
    res.json(req.song)
}

const getJacket = (req: ISongRequest, res: Response) => {
    if (!req.song) return res.status(500)
    const canvas = getSongCanvas(req.song.id)
    returnImage(canvas, res)
}

const getPixelatedJacket = (req: ISongRequest, res: Response) => {
    if (!req.song) return res.status(400)
    const pixelCount = req.params.pixel ? parseInt(req.params.pixel) : 16
    const canvas = getSongCanvas(req.song.id)
    pixelated(canvas, pixelCount)
    returnImage(canvas, res)
}

const getCrop = (req: ISongRequest, res: Response) => {
    const width = req.params.width ? parseInt(req.params.width) : 96
    const height = req.params.height ? parseInt(req.params.height) : width
    const x = req.params.x ? parseInt(req.params.x) : null
    const y = req.params.y ? parseInt(req.params.y) : null
    if (!req.song) return res.status(400)
    console.log(req.song.id)
    const canvas = getSongCanvas(req.song.id)
    if (x === null || y === null) {
        returnImage(randomCrop(canvas, width, height), res)
    } else {
        if (x + width > 512 || y + height > 512) return res.status(400).json({
            message: "Image crop dimension exceed base image 512 x 512"
        })
        returnImage(cropImage(canvas, x, y, width, height), res)
    }
}

export { rootController, getSong, getJacket, getPixelatedJacket, getCrop }