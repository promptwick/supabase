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

	info(message: string, meta?: Record<string, unknown>) {
		console.info(this.formatMessage('info', message, meta));
	}

	warn(message: string, meta?: Record<string, unknown>) {
		console.warn(this.formatMessage('warn', message, meta));
	}

	error(message: string, meta?: Record<string, unknown>) {
		console.error(this.formatMessage('error', message, meta));
	}

	debug(message: string, meta?: Record<string, unknown>) {
		console.debug(this.formatMessage('debug', message, meta));
	}

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
