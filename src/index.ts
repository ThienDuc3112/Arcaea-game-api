import express, { json } from "express"
import { config } from "dotenv"
import { singlePlayerRouter } from "./Routes/singleplayer";
config();

const app = express()

app.use("/static", express.static(__dirname + "/public/songjacket"))
app.use(json())

app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

app.use("/oneplayer", singlePlayerRouter)

