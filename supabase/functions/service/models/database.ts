import { snakeCase } from "https://deno.land/x/case@2.2.0/mod.ts";
import { Pool, Transaction } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

import logger from "../utils/logger.ts";

import BaseEntity, {
  hasDefault,
  isExtraField,
  isPrimaryKey,
} from "./base_entity.ts";

const log = logger.child({ namespace: "models.database" });

export default class Database {
  static #instance: Database;

  declare dsn: string;
  declare pool: Pool;
  declare debug: boolean;

  constructor(debug = false) {
    this.debug = debug;
    const dsn = Deno.env.get("SUPABASE_DB_URL");
    this.pool = new Pool(dsn, 3, true);
  }

  public static get instance(): Database {
    return (() => {
      if (!Database.#instance) {
        Database.#instance = new Database(true);
      }

      return Database.#instance;
    })();
  }

  public convertForSql(value: unknown) {
    if (value instanceof Date) {
      return value.toISOString();
    }

    return value;
  }

  public async insertMultiple<T extends BaseEntity>(
    tableName: string,
    records: T[],
    onDuplicateKeyUpdateFields: string[] = [],
    transaction: Transaction | null = null,
  ): Promise<void> {
    const attrs = Object.getOwnPropertyNames(records[0]).filter((attr) =>
      !isExtraField(records[0], attr)
    );
    const placeholders: string[] = [];
    const values = records
      .map((record) =>
        attrs
          .map((attr, index) => {
            const value = (record as never)[attr];
            if (hasDefault(record, attr) && value === undefined) {
              placeholders.push("DEFAULT");
            } else {
              placeholders.push(`$${index + 1}`);
            }

            return value;
          })
          .filter((value) => value !== undefined)
          .map(this.convertForSql)
      )
      .flat();

    let stmt = `INSERT INTO ${tableName} (${
      attrs.map((attr) => snakeCase(attr)).join(",")
    }) VALUES (${placeholders.join(",")})`;
    if (onDuplicateKeyUpdateFields.length > 0) {
      stmt += ` ON DUPLICATE KEY UPDATE ${
        onDuplicateKeyUpdateFields.map((field) => `${field}=NEW.${field}`).join(
          ",",
        )
      }`;
    }

    log.debug(`Executing statement: ${stmt} with values %o`, values);

    if (transaction !== null) {
      await transaction.queryArray(stmt, values);
      return;
    }

    let conn;
    try {
      conn = await this.pool.connect();
      await conn.queryArray(stmt, values);
    } catch (error) {
      log.error(`Error executing statement: ${stmt} with values %o`, values);
      throw error;
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }

  public insert<T extends BaseEntity>(
    tableName: string,
    record: T,
    onDuplicateKeyUpdateFields: string[] = [],
    transaction: Transaction | null = null,
  ): Promise<void> {
    return this.insertMultiple<T>(
      tableName,
      [record],
      onDuplicateKeyUpdateFields,
      transaction,
    );
  }

  public async update<T extends BaseEntity>(
    tableName: string,
    record: T,
    fieldsToUpdate: string[],
    transaction: Transaction | null = null,
  ): Promise<void> {
    const assignments = fieldsToUpdate.map((field, index) =>
      `${snakeCase(field)} = $${index + 1}`
    );

    const conditions = Object.getOwnPropertyNames(record).filter((attr) =>
      isPrimaryKey(record, attr)
    ).map((attr, index) =>
      `${snakeCase(attr)} = $${fieldsToUpdate.length + index + 1}`
    );

    const stmt = `UPDATE ${tableName} SET ${assignments.join(", ")} WHERE ${
      conditions.join(" AND ")
    }`;

    const values = fieldsToUpdate.map((field) => (record as never)[field])
      .concat(
        Object.getOwnPropertyNames(record).filter((attr) =>
          isPrimaryKey(record, attr)
        ).map((attr) => (record as never)[attr]),
      )
      .map(this.convertForSql);

    log.debug(`Executing statement: ${stmt} with values %o`, values);

    if (transaction !== null) {
      await transaction.queryArray(stmt, values);
      return;
    }

    let conn;
    try {
      conn = await this.pool.connect();
      await conn.queryArray(stmt, values);
    } catch (error) {
      log.error(`Error executing statement: ${stmt} with values %o`, values);
      throw error;
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }

  public async remove<T extends BaseEntity>(
    tableName: string,
    record: T,
    transaction: Transaction | null = null,
  ): Promise<void> {
    const conditions = Object.getOwnPropertyNames(record).filter((attr) =>
      isPrimaryKey(record, attr)
    ).map((attr, index) => `${snakeCase(attr)} = $${index + 1}`);

    const stmt = `DELETE FROM ${tableName} WHERE ${conditions.join(" AND ")}`;
    const values = Object.getOwnPropertyNames(record).filter((attr) =>
      isPrimaryKey(record, attr)
    ).map((attr) => (record as never)[attr]).map(this.convertForSql);

    log.debug(`Executing statement: ${stmt} with values %o`, values);

    if (transaction !== null) {
      await transaction.queryArray(stmt, values);
      return;
    }

    let conn;
    try {
      conn = await this.pool.connect();
      await conn.queryArray(stmt, values);
    } catch (error) {
      log.error(`Error executing statement: ${stmt} with values %o`, values);
      throw error;
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }

  public async query<T extends BaseEntity>(
    query: string,
    values: unknown[] = [],
    transaction: Transaction | null = null,
  ): Promise<T[]> {
    log.debug(`Executing query: ${query} with values %o`, values);

    if (transaction !== null) {
      const { rows } = await transaction.queryObject<T>(query, values);
      return rows;
    }

    let conn;
    try {
      conn = await this.pool.connect();
      const { rows } = await conn.queryObject<T>(query, values);

      return rows;
    } catch (error) {
      log.error(`Error executing query: ${query} with values %o`, values);
      throw error;
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }

  public async queryOne<T extends BaseEntity>(
    query: string,
    values: unknown[] = [],
    transaction: Transaction | null = null,
  ): Promise<T | null> {
    const result = await this.query<T>(query, values, transaction);
    if (result && result.length > 0) {
      return result[0];
    }
    return null;
  }

  public async queryRaw(query: string, values: unknown[]): Promise<unknown[]> {
    log.debug(`Executing raw query: ${query} with values %o`, values);

    let conn;
    try {
      conn = await this.pool.connect();
      const { rows } = await conn.queryObject(query, values);

      return rows;
    } catch (error) {
      log.error(`Error executing raw query: ${query} with values %o`, values);
      throw error;
    } finally {
      if (conn) {
        conn.release();
      }
    }
  }

  public async queryRawRow(query: string, values: unknown[]): Promise<unknown> {
    const result = await this.queryRaw(query, values);
    if (result.length > 0) {
      return result[0];
    }
    return null;
  }

  public async queryRawCell(
    query: string,
    values: unknown[],
  ): Promise<unknown> {
    const result = await this.queryRawRow(query, values) as object;
    if (result) {
      return Object.values(result)[0];
    }
    return null;
  }

  public async withTransaction(
    func: (transaction: Transaction) => Promise<unknown>,
  ) {
    const conn = await this.pool.connect();
    const transaction = conn.createTransaction("");
    try {
      await transaction.begin();
      await func(transaction);
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
