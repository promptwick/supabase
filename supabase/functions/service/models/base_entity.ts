import {
  instanceToPlain,
  plainToClass,
} from "npm:class-transformer";

export default class BaseEntity {
  // Optionally override in subclasses
  static primaryKeys: string[] = [];
  static defaultFields: string[] = [];

  toJSON() {
    console.log(this);
    return instanceToPlain(this) as Record<string, unknown>;
  }

  static fromJSON<T extends BaseEntity>(type: { new(): T }, data: Record<string, unknown>) {
    return plainToClass(type, data);
  }
}

// Helper for extra fields if needed in future
export const isExtraField = (_target: object, _propertyKey: string) => false;
