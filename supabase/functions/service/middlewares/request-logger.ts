import type { Context, Next } from "jsr:@hono/hono";

import logger from "../utils/logger.ts";

const log = logger.child("middlewares.request-logger");

const requestLogger = (c: Context, next: Next) => {
  if (c.req.param()) {
    log.info("request params", { params: c.req.param() });
  }
  if (c.req.raw) {
    log.info("request json", { body: c.req.raw });
  }
  if (c.req.query) {
    log.info("request query", { query: c.req.query });
  }

  next();
};

export default requestLogger;
