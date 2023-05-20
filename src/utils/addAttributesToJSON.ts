import { log } from "console";
import { produce } from "immer";

export type AttributeType = "integer" | "string" | "boolean";

export interface Attribute {
  title: string;
  type: AttributeType;
  required?: boolean;
  format?: string;
}

export interface JsonTemplate {
  type: string;
  required: string[];
  properties: {
    [key: string]: {
      title?: string;
      type: AttributeType;
      format?: string;
    };
  };
}

const JSON_TEMP: JsonTemplate = {
  type: "object",
  required: ["id"],
  properties: {
    id: {
      title: "Credential Subject ID",
      type: "string",
      format: "uri",
    },
  },
};

export function addAttributesToJSON(attributes: Attribute[]): JsonTemplate {
  return produce(JSON_TEMP, (draft) => {
    for (const attribute of attributes) {
      if (attribute.required) {
        draft.required.push(attribute.title);
      }
      draft.properties[attribute.title] = {
        // title: attribute.title,
        type: attribute.type,
        // format: attribute.format,
      };
    }
  });
}
