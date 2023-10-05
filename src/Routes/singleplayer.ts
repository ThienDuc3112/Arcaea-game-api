import { Router, Request, Response, NextFunction } from "express";
import songList from "../public/songlist.json"
import { createCanvas, Image, CanvasRenderingContext2D } from "canvas";
import fs from "fs"

const singlePlayerRouter = Router()

singlePlayerRouter.get("/", (req, res) => {
    res.json(songList)
})

interface ISong {
    id: string;
    title: {
        en: string;
        ko?: undefined;
        "zh-Hant"?: undefined;
        "zh-Hans"?: undefined;
        ja?: undefined;
        kr?: undefined;
    };
    artist: string;
}

interface ISongRequest extends Request {
    song?: ISong
}

const randomSong = (req: ISongRequest, res: Response, next: NextFunction) => {
    const song: ISong = songList[Math.floor(Math.random() * songList.length)] as ISong;
    req.song = song
    if (!song) return res.status(500)
    next()
}

singlePlayerRouter.get("/randomsong", randomSong, (req: ISongRequest, res) => {
    res.json(req.song)
})

const pixelated = (ctx: CanvasRenderingContext2D, sampleSize: number, w: number, h: number) => {
    let pixelArr = ctx.getImageData(0, 0, w, h).data
    for (let y = 0; y < h; y += sampleSize) {
        for (let x = 0; x < w; x += sampleSize) {
            let p = (x + (y * w)) * 4
            let red = pixelArr[p]
            let green = pixelArr[p + 1]
            let blue = pixelArr[p + 2]
            let a = pixelArr[p + 3]
            for (let i = 1; i < sampleSize; i++) {
                red += pixelArr[p + i * 4]
                green += pixelArr[p + i * 4 + 1]
                blue += pixelArr[p + i * 4 + 2]
            }
            ctx.fillStyle = `rgba(${Math.round(red / sampleSize)}, ${Math.round(green / sampleSize)}, ${Math.round(blue / sampleSize)}, ${a})`
            ctx.fillRect(x, y, sampleSize, sampleSize)
        }
    }
}

singlePlayerRouter.get("/pixelated", randomSong, async (req: ISongRequest, res) => {
    let baseImage = new Image()
    baseImage.src = fs.readFileSync(__dirname + `/../public/songjacket/${req.song?.id}.jpg`)
    const w = baseImage.width;
    const h = baseImage.height
    const canvas = createCanvas(w, h)
    const ctx = canvas.getContext("2d")
    console.log(`${process.env.BASE_URL}/static/${req.song?.id}.jpg`)
    console.log(baseImage.height, baseImage.width)
    ctx.drawImage(baseImage, 0, 0)
    let sampleSize = Math.floor(w / 16)
    pixelated(ctx, sampleSize, w, h)
    const img = Buffer.from(canvas.toDataURL().split(",")[1], "base64")
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img);
})

export { singlePlayerRouter }