import express, { json } from "express"
import { config } from "dotenv"
import { utilRouter } from "./Routes/util";
import cors from "cors"
config();

const app = express()

app.use(json())
app.use(cors())

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to my Arcaea util API, this is where you can get song jacket and song data such as charter, difficulty, version, etc... (song's cc are not included yet). All path use get method unless specify otherwise",
        description: {
            "/util": "Mostly song's jacket related command"
        },
        path: {
            "/util": {
                "/": "return list of songs and their title and id",
                "/jacket": "return a random song jacket",
                "/jacket/:id": "return the jacket of the song id, status 404 and return {message: string} if not found",
                "/pixelated": "return a random pixelated song jacket, default at 16x16 pixelated image",
                "/pixelated/:id": "return a pixelated image of the song id, default at 16x16",
                "/pixelated/:id/:size": "return a pixelated image of the song id at {size} x {size}",
                "/crop": "return a randomly position crop of a random jacket (like \"/a guessc\" command from lxbot), default crop is 96x96",
                "/crop/:id": "return a randomly position crop of the id song jacket (like \"/a guessc\" command from lxbot), default crop is 96x96",
                "/crop/:id/:width": "return a randomly position crop of the id song jacket (like \"/a guessc\" command from lxbot) with dimension {width} x {width}",
                "/crop/:id/:width/:height": "return a randomly position crop of the id song jacket, default crop is {width} x {height}",
                "/crop/:id/:width/:height/:x/:y": "return a crop of the id song jacket start at position (x,y), default crop is {width} x {height}",
            }
        }
    })
})

app.use("/util", utilRouter)

