import express from "express"
import {PORT, NODE_ENV} from "./config/env.config.js"

async function start() {
    const app = express()
    app.use(express.json({ limit: "50kb" }))
    app.use(express.urlencoded({ limit: "50kb" }))

    app.get("/api/v0/health", (_, res) => {
        res.status(200).json({ status: "ok", timestamp: new Date().toISOString(), uptime: `${process.uptime()}s`, status: "healthy" })
    })

    app.listen(PORT, () => {
        console.info(`server running on: http://localhost:${PORT}`)
    })
}

start().catch(err => {
    console.error(`Server Error: ${err.message}`)
    console.dir(err)
    if(NODE_ENV === "production") {
        process.exit(1)
    }
})