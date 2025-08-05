import type { Context, Next } from "jsr:@hono/hono";

import logger from "../utils/logger.ts";

const log = logger.child({ namespace: "middlewares.request-logger" });

const requestLogger = (c: Context, next: Next) => {
  if (c.req.param()) {
    log.info(c.req.param(), "request params");
  }
  if (c.req.raw) {
    log.info(c.req.raw, "request json");
  }
  if (c.req.query) {
    log.info(c.req.query, "request query");
  }

  next();
};

export default requestLogger;
