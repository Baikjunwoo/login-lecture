const {createLogger, transports, format} = require('winston');
const {combine, timestamp, printf, colorize, simple, json, label} = format;
const {Console, File} = transports;

const printFormat = printf(({ level, label, message, timestamp }) => {
    return `${timestamp} [${label}] : [${level}] : ${message}`;
});

const printfLogFormat = {
    file :combine(
    label({label: 'App 화이팅',}),
    timestamp({format: 'YYYY-MM-DD HH:mm:ss',}),
    printFormat
    ),
    cons : combine(
        colorize({all: true}),
        simple(),
    ),
};

const options = {
    file: new File({ 
        filename: 'accessLogger.log',
        dirname: './log', 
        level: 'info',
        format: printfLogFormat.file,
    },),
    cons: new Console({
        level: 'info',
        format: printfLogFormat.cons,
    },),
};

const logger = createLogger({
    transports: [options.file,]
});

if(process.env.NODE_ENV !== "Production"){
    logger.add(options.cons);
};

logger.stream = {
    write: (message) => {
        logger.info(message.trim());
    },
};
module.exports = logger;