import pino from "pino";

let logger = pino();

export function printReceivedData(data: any) {
    logger.info(data, "Received data");
}

export function printDbResponce(data: any) {
    logger.info(data, "Received from DB");
}

export default logger;