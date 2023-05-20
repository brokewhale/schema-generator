import { produce } from "immer";

export const addCredentialsToTemplate = (credentialSubject: object) => {
  return produce(SchemaTemplate, (draft) => {
    draft.properties.credentialSubject = {
      ...credentialSubject,
    };
  });
};

const SchemaTemplate = {
  $schema: "http://json-schema.org/draft-07/schema#",
  type: "object",
  $metadata: {
    uris: {
      jsonLdContext: "",
      jsonSchema: "",
    },
  },
  required: [
    "@context",
    "id",
    "type",
    "issuanceDate",
    "credentialSubject",
    "credentialSchema",
    "credentialStatus",
    "issuer",
  ],
  properties: {
    "@context": {
      type: ["string", "array", "object"],
    },
    id: {
      type: "string",
    },
    type: {
      type: ["string", "array"],
      items: {
        type: "string",
      },
    },
    issuer: {
      type: ["string", "object"],
      format: "uri",
      required: ["id"],
      properties: {
        id: {
          type: "string",
          format: "uri",
        },
      },
    },
    issuanceDate: {
      type: "string",
      format: "date-time",
    },
    expirationDate: {
      type: "string",
      format: "date-time",
    },
    credentialSchema: {
      type: "object",
      required: ["id", "type"],
      properties: {
        id: {
          type: "string",
          format: "uri",
        },
        type: {
          type: "string",
        },
      },
    },
    subjectPosition: {
      type: "string",
      enum: ["none", "index", "value"],
    },
    merklizationRootPosition: {
      type: "string",
      enum: ["none", "index", "value"],
    },
    revNonce: {
      type: "integer",
    },
    version: {
      type: "integer",
    },
    updatable: {
      type: "boolean",
    },
    credentialSubject: {
      // add credential sub
    },
  },
};
