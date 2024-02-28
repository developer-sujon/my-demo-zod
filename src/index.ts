import { z } from "zod";

enum Skils {
  JS,
  TS,
}

const hubbies = ["Programming", "Gaiter"] as const;

const userSchema = z
  .object({
    name: z.string().min(3).max(5),
    age: z.number().optional(),
    roll: z.number().gt(1),
    birthDay: z.date().optional(),
    isProgramer: z.boolean().default(false).optional(),
    get: z.void(),
    isMarried: z.literal(true).optional(),
    skil: z.nativeEnum(Skils).optional(),
    hubby: z.enum(hubbies).optional(),
  })
  .pick({ name: true })
  .strict();
//   .passthrough();

//omit,pick,partial,deepPartial

const additionalSchema = z.object({ designation: z.string() });
const updateUserSchema = userSchema.merge(additionalSchema);

type User = z.infer<typeof userSchema>;

const user = {
  name: "sujon",
  age: "sujon",
};

const result = userSchema.safeParse(user);

// console.log(userSchema.shape.name);

console.log(result);
