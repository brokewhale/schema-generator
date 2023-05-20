import { produce } from "immer";

interface LDTemplate {
  "@version": number;
  "@protected": boolean;
  id: string;
  type: string;
  [key: string]: any;
}

const LDTEMP: LDTemplate = {
  "@version": 1.1,
  "@protected": true,
  id: "@id",
  type: "@type",
};

export function updateLDTemplate(name: string, obj: object): unknown {
  return produce(LDTEMP, (draft) => {
    draft[name] = {
      "@id": "",
      "@context": obj,
    };
  });
}
