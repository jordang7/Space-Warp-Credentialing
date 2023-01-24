import * as dotenv from "dotenv"
dotenv.config()
import express from "express"
const app = express()
const port = process.env.PORT || 8080
import fetch from "node-fetch"

app.get("/", async (req, res) => {
    try {
        const response = await fetch("https://api.filrep.io/api/v1/miners", {
            method: "GET",
        })
        const minerArray = await response.json()
        res.send(minerArray)
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
        const ourMiner = minerArray.filter((c) => c.id === minerId)
        res.send(ourMiner.score)
    } catch (e) {
        console.error(e)
        res.status(500)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
