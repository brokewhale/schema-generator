import { produce } from "immer";

type AttributeType = "integer" | "string" | "boolean";

interface Attribute {
  title: string;
  type: AttributeType;
  required?: boolean;
  format?: string;
}

interface JsonTemplate {
  "@version": number;
  "@protected": boolean;
  id: string;
  type: string;
  vocab: string;
  xsd: string;
  [key: string]: any;
}

const JSON_TEMP: JsonTemplate = {
  "@version": 1.1,
  "@protected": true,
  id: "@id",
  type: "@type",
  vocab: "",
  xsd: "http://www.w3.org/2001/XMLSchema#",
};
export function addAttributesToJSONLD(attributes: Attribute[]): JsonTemplate {
  return produce(JSON_TEMP, (draft) => {
    for (const attribute of attributes) {
      const { title, type } = attribute;
      draft[title] = {
        "@id": `vocab:${title}`,
        "@type": `xsd:${type}`,
      };
    }
  });
}
