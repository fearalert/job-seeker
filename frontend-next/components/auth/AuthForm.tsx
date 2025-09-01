/** @format */

'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { NICHES, ROLES } from '@/constants';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authFormSchema } from '@/schema/auth.validation';
import { useDispatch, useSelector } from 'react-redux';
import { login, register } from '@/store/slices/user.slice';
import { AppDispatch, RootState } from '@/store/store';
import LoadingView from '@/app/loading';
import { toast } from '@/hooks/use-toast';

const AuthForm = ({
  type,
  role,
}: {
  type: 'login' | 'register';
  role: string;
}) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [loadingHere, setLoadingHere] = useState<boolean>(false);

  const { loading, error } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const formSchema = authFormSchema(type, role);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role,
      email: '',
      name: type === 'register' ? '' : undefined,
      phone: type === 'register' ? '' : undefined,
      address: type === 'register' ? '' : undefined,
      firstNiche:
        type === 'register' && role === ROLES.JOB_SEEKER ? '' : undefined,
      secondNiche:
        type === 'register' && role === ROLES.JOB_SEEKER ? '' : undefined,
      thirdNiche:
        type === 'register' && role === ROLES.JOB_SEEKER ? '' : undefined,
      fourthNiche:
        type === 'register' && role === ROLES.JOB_SEEKER ? '' : undefined,
      coverLetter:
        type === 'register' && role === ROLES.JOB_SEEKER ? '' : undefined,
      resume: null,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setErrorMsg('');
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        const value = (values as any)[key];
        if (value !== undefined && value !== null) {
          formData.append(key, value instanceof File ? value : String(value));
        }
      });

      setLoadingHere(true);

      if (type === 'login') {
        await dispatch(
          login({ email: values.email, password: values.password, role })
        );
        toast({
          title: 'Success',
          description: 'Login Successful',
          variant: 'success',
        });
        router.push('/dashboard');
      } else {
        await dispatch(register(formData));
        toast({
          title: 'Success',
          description: 'Registration Successful',
          variant: 'success',
        });
        role === ROLES.JOB_SEEKER
          ? router.push('/auth/candidate/login')
          : router.push('/auth/employer/login');
      }
    } catch (e: any) {
      setErrorMsg(error || 'An error occurred. Please try again.');
      toast({
        title: 'Error',
        description: e?.response?.message || error,
        variant: 'destructive',
      });
    } finally {
      setLoadingHere(false);
    }
  };

  if (loading || loadingHere) return <LoadingView />;

  return (
    <div className="w-full max-w-2xl md:max-w-3xl lg:max-w-4xl p-6 md:p-12 bg-white rounded-2xl shadow-lg animate-slideIn">
      {/* Form Section */}
      <div className="flex flex-1 justify-center items-center bg-white p-6 md:p-16">
        <div className="w-full max-w-md space-y-6 animate-slideIn">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-4">
            {role} {type === 'login' ? 'Login' : 'Register'}
          </h1>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4">
              {/* Name */}
              {type === 'register' && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="relative group">
                      <FormLabel className="absolute -top-2 left-3 bg-white px-1 text-gray-500 text-sm group-focus-within:text-indigo-600 transition-all duration-200">
                        {role === ROLES.JOB_SEEKER
                          ? 'Full Name'
                          : 'Organization Name'}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" "
                          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="relative group">
                    <FormLabel className="absolute -top-2 left-3 bg-white px-1 text-gray-500 text-sm group-focus-within:text-indigo-600 transition-all duration-200">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder=" "
                        className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="relative group">
                    <FormLabel className="absolute -top-2 left-3 bg-white px-1 text-gray-500 text-sm group-focus-within:text-indigo-600 transition-all duration-200">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder=" "
                        className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              {type === 'register' && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="relative group">
                      <FormLabel className="absolute -top-2 left-3 bg-white px-1 text-gray-500 text-sm group-focus-within:text-indigo-600 transition-all duration-200">
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder=" "
                          className="rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Niche Selection */}
              {type === 'register' && role === ROLES.JOB_SEEKER && (
                <div className="grid grid-cols-2 gap-2">
                  {[
                    'firstNiche',
                    'secondNiche',
                    'thirdNiche',
                    'fourthNiche',
                  ].map((fieldName, idx) => (
                    <FormField
                      key={idx}
                      control={form.control}
                      name={fieldName as any}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{`Niche ${idx + 1}`}</FormLabel>
                          <FormControl>
                            <select
                              {...field}
                              className="border w-full px-2 py-1 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all">
                              <option value="">Select Niche</option>
                              {NICHES.map((niche) => (
                                <option
                                  key={niche}
                                  value={niche}>
                                  {niche}
                                </option>
                              ))}
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              )}

              {/* Cover Letter & Resume */}
              {type === 'register' && role === ROLES.JOB_SEEKER && (
                <>
                  <FormField
                    control={form.control}
                    name="coverLetter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Letter</FormLabel>
                        <FormControl>
                          <textarea
                            {...field}
                            placeholder="Write your cover letter"
                            className="border w-full px-2 py-2 rounded-md focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition-all"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="resume"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload Resume</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            onChange={(e) =>
                              field.onChange(e.target.files?.[0] || null)
                            }
                            className="border w-full bg-gray-50 px-2 py-1 rounded-md"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}

              {/* Forgot Password */}
              {type === 'login' && (
                <Link
                  href="/auth/forgot-password"
                  className="text-right block text-sm text-gray-500 hover:text-primary transition-all">
                  Forgot Password?
                </Link>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                variant={'primary'}
                className="w-full py-3 mt-4 hover:bg-indigo-700 text-white rounded-lg font-semibold shadow-md transition-all duration-200">
                {type === 'login' ? 'Sign In' : 'Sign Up'}
              </Button>

              {/* Error Messages */}
              {(error || errorMsg) && (
                <p className="text-red-500 text-center mt-2">
                  {error || errorMsg}
                </p>
              )}

              {/* Switch Links */}
              <div className="flex justify-center gap-2 mt-4 text-sm">
                <span>
                  {type === 'login'
                    ? "Don't have an account?"
                    : 'Already have an account?'}
                </span>
                <Link
                  href={
                    role === ROLES.JOB_SEEKER
                      ? type === 'login'
                        ? '/auth/candidate/register'
                        : '/auth/candidate/login'
                      : type === 'login'
                      ? '/auth/employer/register'
                      : '/auth/employer/login'
                  }
                  className="font-semibold text-indigo-600 hover:underline">
                  {type === 'login' ? 'Sign Up' : 'Log In'}
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
