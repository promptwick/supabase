type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LoggerOptions {
	namespace?: string;
	parentNamespaces?: string[];
}

class Logger {
	private namespace: string;
	private parentNamespaces: string[];

	constructor(options: LoggerOptions = {}) {
		this.namespace = options.namespace || '';
		this.parentNamespaces = options.parentNamespaces || [];
	}

		/**
		 * Formats a log message as a JSON string with timestamp, level, namespace, and optional metadata.
		 * @param level - The log level (info, warn, error, debug)
		 * @param message - The log message
		 * @param meta - Optional metadata to include in the log
		 * @returns The formatted log message as a JSON string
		 */
		private formatMessage(level: LogLevel, message: string, meta?: Record<string, unknown>) {
		const namespaces = [...this.parentNamespaces, this.namespace].filter(Boolean);
		return JSON.stringify({
			timestamp: new Date().toISOString(),
			level,
			namespace: namespaces.join(':') || undefined,
			message,
			...meta,
		});
	}

		/**
		 * Logs an info-level message.
		 * @param message - The log message
		 * @param meta - Optional metadata to include in the log
		 */
		info(message: string, meta?: Record<string, unknown>) {
		console.info(this.formatMessage('info', message, meta));
	}

		/**
		 * Logs a warning-level message.
		 * @param message - The log message
		 * @param meta - Optional metadata to include in the log
		 */
		warn(message: string, meta?: Record<string, unknown>) {
		console.warn(this.formatMessage('warn', message, meta));
	}

		/**
		 * Logs an error-level message.
		 * @param message - The log message
		 * @param meta - Optional metadata to include in the log
		 */
		error(message: string, meta?: Record<string, unknown>) {
		console.error(this.formatMessage('error', message, meta));
	}

		/**
		 * Logs a debug-level message.
		 * @param message - The log message
		 * @param meta - Optional metadata to include in the log
		 */
		debug(message: string, meta?: Record<string, unknown>) {
		console.debug(this.formatMessage('debug', message, meta));
	}

		/**
		 * Creates a child logger with an additional namespace.
		 * @param namespace - The child namespace
		 * @returns A new Logger instance with the extended namespace
		 */
		child(namespace: string): Logger {
		return new Logger({
			namespace,
			parentNamespaces: [...this.parentNamespaces, this.namespace].filter(Boolean),
		});
	}
}

const logger = new Logger();

export default logger;
export { Logger };
