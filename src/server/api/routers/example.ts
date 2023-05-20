import { addCredentialsToTemplate } from "~/utils/addCredentialsToTemplate";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { addAttributesToJSON } from "~/utils/addAttributesToJSON";

const attributesSchema = z.array(
  z.object({
    title: z.string(),
    type: z.enum(["integer", "string", "boolean"]),
    required: z.boolean().optional(),
  })
);
const jsonTempSchema = z.object({
  type: z.string(),
  required: z.array(z.string()),
  properties: z.record(
    z.object({
      title: z.string().optional(),
      type: z.string(),
      format: z.string().optional(),
    })
  ),
});
const inputSchema = z.object({
  name: z.string(),
  attributes: attributesSchema,
});
export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  generateJsonSchema: publicProcedure.input(inputSchema).query(({ input }) => {
    const updatedJSONTEMP = addAttributesToJSON(input.attributes);
    const credentialSubject = jsonTempSchema.parse(updatedJSONTEMP) as object;
    const jsonSchema = addCredentialsToTemplate(credentialSubject);
    return jsonSchema;
  }),
});
