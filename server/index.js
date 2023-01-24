import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import fetch from "node-fetch"

const app = express()
// push them above the router middleware!

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

// parse application/json
app.use(express.json())
const port = process.env.PORT || 8080
app.use(cors())
app.get("/", async (req, res) => {
    try {
        const response = await fetch("https://api.filrep.io/api/v1/miners", {
            method: "GET",
        })
        const minerArray = await response.json()
        res.send(minerArray.miners)
    } catch (e) {
        console.error(e)
        res.status(500)
    }
})

app.post("/mintCredential", async (req, res) => {
    const { minerId } = req.body
    try {
        const response = await fetch("https://api.filrep.io/api/v1/miners", {
            method: "GET",
        })
        const minerArray = await response.json()
        const ourMiner = minerArray.miners.filter((c) => c.address == minerId)
        res.send(ourMiner[0].score)
    } catch (e) {
        console.error(e)
        res.status(500)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
