import pino from 'npm:pino';

const logger = pino.default({ level: 'debug', name: 'promptly.service' });

export default logger;
