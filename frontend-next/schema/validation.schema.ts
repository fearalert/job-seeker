import { ROLES } from "@/constants";
import { z } from "zod";

export const authFormSchema = (type: "register" | "login", role: string) => {
  const baseSchema = z.object({
    role: z.string().refine((val) => val === role, {
      message: `Role must be "${role}"`,
    }),
    email: z.string().email(),
    name:
      type === "register"
        ? z.string().min(2, "Full name must be at least 2 characters.").max(30, "Full name must be at most 30 characters.")
        : z.string().optional(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(16, "Password must be at most 16 characters.")
      // .regex(
      //   PASSWORD_REGEX,
      //   "Password must contain at least one letter, one number, and one special character."
      // )
      ,
    confirmPassword:
      type === "register"
        ? z.string().min(6, "Password must be at least 6 characters.")
        : z.string().optional(),
  });

  if (role === ROLES.JOB_SEEKER && type === "register") {
    return baseSchema.extend({
      firstNiche: z.string().min(1, "Please select your first niche."),
      secondNiche: z.string().min(1, "Please select your second niche."),
      thirdNiche: z.string().min(1, "Please select your third niche."),
      fourthNiche: z.string().min(1, "Please select your fourth niche."),
      coverLetter: z.string().min(100, "Cover letter must be at least 100 characters."),
      resume: z.any().optional(),
    }).refine(data => {
      // Ensure all niches are unique
      const niches = [data.firstNiche, data.secondNiche, data.thirdNiche, data.fourthNiche];
      return new Set(niches).size === niches.length;  // Check for uniqueness
    }, {
      message: "You cannot select the same niche more than once.",
      path: ["firstNiche", "secondNiche", "thirdNiche", "fourthNiche"],
    });;
  }

  return baseSchema;
};
