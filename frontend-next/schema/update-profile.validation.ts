import { NICHES } from "@/constants";
import { z } from "zod";

export const updateProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    phone: z.string()
      .regex(/^\d{10}$/, "Phone number must be 10 digits"),
    address: z.string().min(5, "Address must be at least 5 characters long"),
    coverLetter: z.string().optional(),
    niches: z.object({
        firstNiche: z.string().min(1, "Please select your first niche."),
        secondNiche: z.string().min(1, "Please select your second niche."),
        thirdNiche: z.string().min(1, "Please select your third niche."),
        fourthNiche: z.string().min(1, "Please select your fourth niche."),
    }).optional(),
    resume: z.instanceof(File).optional()
  }).refine(data => {
    if (data.niches) {
      const nicheValues = Object.values(data.niches);
      const uniqueNiches = new Set(nicheValues);
      return uniqueNiches.size === nicheValues.length;
    }
    return true;
  }, {
    message: "Each niche must be unique",
    path: ["niches"]
  });