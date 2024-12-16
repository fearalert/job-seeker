"use client";

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
import { authFormSchema } from "@/schema/auth.validation";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "@/store/slices/user.slice";
import { AppDispatch, RootState } from "@/store/store";
import LoadingView from "@/app/loading";
import { toast } from "@/hooks/use-toast";

const AuthForm = ({ type, role }: { type: "login" | "register"; role: string }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [loadingHere, setLoadingHere] = useState<boolean>(false);

  const { loading, error, isAuthenticated } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const formSchema = authFormSchema(type, role);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role,
      email: "",
      name: type === "register" ? "" : undefined,
      phone: type === "register" ? "" : undefined,
      address: type === "register" ? "" : undefined,
      firstNiche: type === "register" && role === ROLES.JOB_SEEKER ? "" : undefined,
      secondNiche: type === "register" && role === ROLES.JOB_SEEKER ? "" : undefined,
      thirdNiche: type === "register" && role === ROLES.JOB_SEEKER ? "" : undefined,
      fourthNiche: type === "register" && role === ROLES.JOB_SEEKER ? "" : undefined,
      coverLetter: type === "register" && role === ROLES.JOB_SEEKER ? "" : undefined,
      resume: null,
      password: "",
      confirmPassword: "",
    },
  });

  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setErrorMsg("");
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        const value = (values as any)[key];
        if (value !== undefined && value !== null) {
          formData.append(key, value instanceof File ? value : String(value));
        }
      });

      if (type === "login") {

        setLoadingHere(true);

        await dispatch(login({ email: values.email, password: values.password, role: role}));
        router.push("/dashboard");
        toast({
            title: "Success",
            description: "Login Successful",
            variant: "success"
          });
          
      } else if (type === "register") {
        setLoadingHere(true);
        await dispatch(register(formData));

          role === ROLES.JOB_SEEKER ? 
          router.push("/auth/candidate/login") : router.push("/auth/employer/login")

          toast({
            title: "Success",
            description: "Login Successful",
            variant: "destructive"
          })
        
      }
    } catch (e: any) {
      setErrorMsg("An error occurred. Please try again.");
      toast({
        title: "Error",
        description: error || e,
        className: "bg-red-600 text-white"
      });
      setLoadingHere(false);
    } finally {
      setLoadingHere(false);
      setErrorMsg("");
    }
  };

  if (loading || loadingHere) {
    return (
    <LoadingView />
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
      <h1 className="form-title">
          {role} {type.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())}
        </h1>
        {type === "register" && (
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>{role === ROLES.JOB_SEEKER ? "Name" : "Organization Name"}</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        )}

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Enter your email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

      {type === "register" && (
          <FormField control={form.control} name="phone" render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        )}

        {type === "register" && (
          <FormField control={form.control} name="address" render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter your address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />
        )}


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

        {type === "register" && role === ROLES.JOB_SEEKER && (
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
        
        {type === "register" && role === ROLES.JOB_SEEKER && (
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

        <br />
        {
          type === "login" &&
          <Link className="text-end text-zinc-500 text-sm" href="/auth/forgot-password">Forgot Password?</Link>
        }
        <br />
        <Button type="submit" variant="primary">
          {type === "login" ? "Sign In" : "Sign Up"}
        </Button>

        {error && <p className="text-destructive">{error}</p>}
        {errorMsg && <p className="text-destructive">{errorMsg}</p>}

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
