import app from "./app"
import Config from "./config/Config"
import logger from "./config/logger"
import dbConnect from "./db/dbConnect"

const createServer = () => {
    app.listen(Config.PORT, () => {
        logger.info(`Connected to server at PORT ${Config.PORT}`)
    })
}

dbConnect().then(() => {
    createServer();
}).catch((err) => {
    logger.error("Mongodb Error: ", err)
})