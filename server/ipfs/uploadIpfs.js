import * as dotenv from "dotenv"
dotenv.config()
import { create as ipfsClient } from "ipfs-http-client"
//import medal from "../images/medal.png"
const projectId = process.env.INFURA_PROJECT_ID //put infura id
const projectSecret = process.env.INFURA_API_KEY_SECRET //put infura secret
const auth = "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64")
console.log(projectId, projectSecret)
const client = ipfsClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: auth,
    },
})
console.log("here??")

export default async function ipfsUpload(miner) {
    let image
    const date = Date.now().toLocaleString()
    // if (miner.score < 90) {
    //     image = medal
    // }
    //const result = await client.add(image)
    //let imagePath = `https://gateway.ipfs.io/ipfs/${result.path}`
    const file = {
        path: "/",
        content: JSON.stringify({
            name: "Credential",
            attributes: {
                minerId: miner.address,
                reputationScore: miner.score,
                rawPower: miner.rawPower,
                region: miner.region,
            },
            //image: imagePath,
            description: `Credential for ${miner.address}, scores provided by filrep.io and updated on ${date}`,
        }),
    }

    const res = await client.add(file)
    console.log(res)
    return res.path
}
