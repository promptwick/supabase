import {
  instanceToPlain,
  plainToClass,
} from "npm:class-transformer";
import { Reflect } from "https://deno.land/x/reflect_metadata@v0.1.12/mod.ts";

const HAS_DEFAULT = Symbol("HAS_DEFAULT");
export const HasDefault = () => Reflect.metadata(HAS_DEFAULT, true);
export const hasDefault = (target: object, propertyKey: string) =>
  Reflect.getMetadata(HAS_DEFAULT, target, propertyKey);

const EXTRA_FIELD = Symbol("EXTRA_FIELD");
export const ExtraField = () => Reflect.metadata(EXTRA_FIELD, true);
export const isExtraField = (target: object, propertyKey: string) =>
  Reflect.getMetadata(EXTRA_FIELD, target, propertyKey);

const PRIMARY_KEY = Symbol("PRIMARY_KEY");
export const PrimaryKey = () => Reflect.metadata(PRIMARY_KEY, true);
export const isPrimaryKey = (target: object, propertyKey: string) =>
  Reflect.getMetadata(PRIMARY_KEY, target, propertyKey);

export default class BaseEntity {
  toJSON() {
    return instanceToPlain(this) as Record<string, unknown>;
  }

  static fromJSON<T extends BaseEntity>(type: {new() : T}, data: Record<string, unknown>) {
    return plainToClass(type, data);
  }
}
