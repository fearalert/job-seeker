"use client"
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { NICHES, ROLES } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authFormSchema } from "@/schema/validation.schema";

const AuthForm = ({ type, role }: { type: "login" | "register", role: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const formSchema = authFormSchema(type, role);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: role,
      email: "",
      name: type === "register" ? "" : undefined, // Optional for login
      firstNiche: "",
      secondNiche: "",
      thirdNiche: "",
      fourthNiche: "",
      coverLetter: "",
      resume: null, // File inputs are not truly controlled
      password: "",
      confirmPassword: type === "register" ? "" : undefined, // Optional for login
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setError("");
    
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">{role} {type.toWellFormed()}</h1>

      {
        type === "register" && (
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>{role===ROLES.JOB_SEEKER ? "Name" : "Organization Name"}</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        )
      }

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Enter your email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="password" render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="Enter your password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {type === "register" && (
          <FormField control={form.control} name="confirmPassword" render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Re-Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        )}

      {type === "register" && role === "Job Seeker" && (
        <h2 className="pt-8 font-bold text-primary">Select Preferences</h2>
      )}

      {type === "register" && role === "Job Seeker" && (
          <div className="grid grid-cols-2 gap-2">
            <FormField control={form.control} name="firstNiche" render={({ field }) => (
              <FormItem>
                <FormLabel>First Niche</FormLabel>
                <FormControl>
                  <select {...field} className="border w-full shadow-none px-2 h-9 rounded-md bg-transparent">
                    <option value="">Select Niche</option>
                    {NICHES.map((niche) => (
                      <option key={niche} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="secondNiche" render={({ field }) => (
              <FormItem>
                <FormLabel>Second Niche</FormLabel>
                <FormControl>
                  <select {...field} className="border w-full shadow-none px-2 h-9 rounded-md bg-transparent">
                    <option value="">Select Niche</option>
                    {NICHES.map((niche) => (
                      <option key={niche} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="thirdNiche" render={({ field }) => (
              <FormItem>
                <FormLabel>Third Niche</FormLabel>
                <FormControl>
                  <select {...field} className="border w-full shadow-none px-2 h-9 rounded-md bg-transparent">
                    <option value="">Select Niche</option>
                    {NICHES.map((niche) => (
                      <option key={niche} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="fourthNiche" render={({ field }) => (
              <FormItem>
                <FormLabel>Fourth Niche</FormLabel>
                <FormControl>
                  <select {...field} className="border w-full shadow-none px-2 h-9 rounded-md bg-transparent">
                    <option value="">Select Niche</option>
                    {NICHES.map((niche) => (
                      <option key={niche} value={niche}>
                        {niche}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
        )}

        {type === "register" && role === "Job Seeker" && (
            <>
             <FormField control={form.control} name="coverLetter" render={({ field }) => (
              <FormItem>
                <FormLabel>Cover Letter</FormLabel>
                <FormControl>
                  <textarea
                    {...field}
                    placeholder="Write your cover letter"
                    className="border w-full shadow-none px-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="resume" render={({ field }) => (
              <FormItem>
                <FormLabel>Upload Resume</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                    className="border w-full bg-secondary shadow-none px-2"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            </>
          )
        }

        <Button type="submit" variant="primary" disabled={isLoading}>
          {type === "login" ? "Sign In" : "Sign Up"}
        </Button>

        {error && <p className="text-destructive">{error}</p>}

        <div className="flex flex-row text-sm gap-2 items-center justify-center py-4">
          <p>{type === "login" ? "Don't have an account?" : "Already have an account?"}</p>
          {
            role === ROLES.JOB_SEEKER && 
            (
              <Link href={type === "login" ? "/auth/candidate/register" : "/auth/candidate/login"} className="font-bold text-primary">
              {type === "login" ? "Sign Up" : "Log In"}
            </Link>
            )
          }

          {
            role === ROLES.EMPLOYER && 
            (
              <Link href={type === "login"? "/auth/employer/register" : "/auth/employer/login"} className="font-bold text-primary">
              {type === "login" ? "Sign Up" : "Log In"}
            </Link>
            )
          }
         
        </div>
      </form>
    </Form>
  );
};

export default AuthForm;