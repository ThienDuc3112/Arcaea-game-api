import { Canvas, Image, createCanvas } from "canvas"
import fs from "fs"
import { Response } from "express"

const getSongCanvas = (id: string) => {
    let baseImage = new Image()
    fs.accessSync(`./songjacket/${id}.jpg`, fs.constants.R_OK)
    baseImage.src = fs.readFileSync(`./songjacket/${id}.jpg`)
    const w = 512;
    const h = 512
    const canvas = createCanvas(w, h)
    const ctx = canvas.getContext("2d")
    ctx.drawImage(baseImage, 0, 0, w, h)
    return canvas
}

const cropImage = (canvas: Canvas, x: number, y: number, w: number, h: number): Canvas => {
    const ctx = canvas.getContext("2d")
    const imagedata = ctx.getImageData(x, y, w, h)
    const newCanvas = createCanvas(w, h)
    const newCtx = newCanvas.getContext("2d")
    newCtx.putImageData(imagedata, 0, 0)
    return newCanvas
}

const randomCrop = (canvas: Canvas, width: number, height: number) => {
    return cropImage(canvas, Math.floor(Math.random() * (512 - width)), Math.floor(Math.random() * (512 - height)), width, height)
}

const returnImage = (canvas: Canvas, res: Response) => {
    const img = Buffer.from(canvas.toDataURL().split(",")[1], "base64")
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': img.length
    });
    res.end(img);
}

const pixelated = (canvas: Canvas, pixelCount: number) => {
    const w = canvas.width
    const h = canvas.height
    const sampleSize = Math.floor(w / pixelCount)
    const ctx = canvas.getContext("2d")
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


export { getSongCanvas, createCanvas, cropImage, randomCrop, returnImage, pixelated }