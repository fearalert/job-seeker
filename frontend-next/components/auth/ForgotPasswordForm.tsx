"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { clearAllUserErrors, forgotPassword } from "@/store/slices/user.slice";
import LoadingView from "@/app/loading";
import { toast } from "@/hooks/use-toast";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address").min(1),
});

const ForgotPasswordForm = () => {
  const [loadingHere, setLoadingHere] = useState<boolean>(false);

  const { loading, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordSchema>) => {
    setLoadingHere(true);
    try {
      const response = await dispatch(forgotPassword(values.email));
      toast({
        title: "Success",
        description: "Password reset email sent successfully.",
        variant: "success",
      });
    } catch (e: any) {
      toast({
        title: "Error",
        description: error || "An error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
        dispatch(clearAllUserErrors())
      setLoadingHere(false);
    }
  };

  if (loading || loadingHere) {
    return <LoadingView />;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">Forgot Password</h1>

        <FormField control={form.control} name="email" render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="Enter your email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <br />
        <Button type="submit" variant="primary">
          Reset Password
        </Button>

        {error && <p className="text-destructive">{error}</p>}
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
