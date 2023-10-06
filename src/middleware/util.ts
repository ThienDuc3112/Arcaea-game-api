import { NextFunction, Response } from "express";
import { ISong, ISongRequest } from "../interface/util";
import songList from "../public/songlist.json"

const randomSongMiddleware = (req: ISongRequest, res: Response, next: NextFunction) => {
    const song: ISong = songList[Math.floor(Math.random() * songList.length)] as ISong;
    req.song = song
    if (!song) return res.status(500)
    next()
}

const getSongMiddleware = (req: ISongRequest, res: Response, next: NextFunction) => {
    const song: ISong = songList.find(song => song.id == req.params.id) as ISong
    console.log(song)
    if (!song) return res.status(404).json({ message: "No such file found" })
    req.song = song
    next()
}

export { randomSongMiddleware, getSongMiddleware }