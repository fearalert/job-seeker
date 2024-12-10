"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  updateProfile, 
  clearAllUpdateProfileErrors 
} from "@/store/slices/update-profile.slice";
import { fetchUser } from "@/store/slices/user.slice";
import { RootState } from "@/store/store";
import { ROLES, NICHES } from "@/constants";
import { ArrowLeft, Save, AlertCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { updateProfileSchema } from "@/schema/update-profile.validation";

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

const UpdateProfilePage = () => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  
  const { user } = useSelector((state: RootState) => state.user);
  const { loading, error, isUpdated } = useSelector((state: RootState) => state.updateProfile);

  // React Hook Form setup
  const { 
    control, 
    handleSubmit, 
    setValue, 
    trigger,
    formState: { errors, isSubmitting } 
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    mode: 'onChange', // Validate on change for better real-time feedback
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: user?.phone?.toString() || "",
      address: user?.address || "",
      coverLetter: user?.coverLetter || "",
      niches: user?.role === ROLES.JOB_SEEKER ? {
        firstNiche: user?.niches?.firstNiche || "",
        secondNiche: user?.niches?.secondNiche || "",
        thirdNiche: user?.niches?.thirdNiche || "",
        fourthNiche: user?.niches?.fourthNiche || "",
      } : undefined
    }
  });

  const [resume, setResume] = useState<File | null>(null);
  const [formSubmissionError, setFormSubmissionError] = useState<string | null>(null);

  useEffect(() => {
    // Clear any previous update errors
    dispatch(clearAllUpdateProfileErrors());
  }, [dispatch]);

  useEffect(() => {
    if (isUpdated) {
      toast({
        title: "Success",
        variant: "success",
        description: "Profile Updated Successfully"
      });
      dispatch(fetchUser());
      dispatch(clearAllUpdateProfileErrors())
      // router.push("/profile");
    }
  }, [isUpdated, dispatch]);

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        variant: "destructive",
        description: error
      });
      setFormSubmissionError(error);
    }
  }, [error]);

  const onSubmit = async (data: UpdateProfileFormData) => {
    setFormSubmissionError(null);

    try {
      const isValid = await trigger();
      if (!isValid) {
        console.error('Form validation failed:', errors);
        toast({
          title: "Validation Error",
          variant: "destructive",
          description: "Please check the form and correct any errors."
        });
        return;
      }

      const formData: any = {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: parseInt(data.phone.replace(/\D/g, ''), 10),
        address: data.address.trim(),
        coverLetter: data.coverLetter?.trim() || "",
      };

      if (user?.role === ROLES.JOB_SEEKER) {
        formData.niches = data.niches;
      }

      if (resume) {
        const maxSize = 5 * 1024 * 1024; // 5MB
        const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

        if (!allowedTypes.includes(resume.type)) {
          toast({
            title: "Invalid File Type",
            variant: "destructive",
            description: "Please upload a PDF or Word document."
          });
          return;
        }

        if (resume.size > maxSize) {
          toast({
            title: "File Too Large",
            variant: "destructive",
            description: "Resume must be less than 5MB."
          });
          return;
        }

        formData.resume = resume;
      }

      // Dispatch the thunk action
      await dispatch(updateProfile(formData));
    } catch (err: any) {
      console.error('Update profile failed:', err);
      const errorMessage = err.message || "Failed to update profile. Please try again.";
      setFormSubmissionError(errorMessage);

      toast({
        title: "Update Failed",
        variant: "destructive",
        description: errorMessage
      });
    }
  };

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      
      const maxSize = 5 * 1024 * 1024;
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      
      if (!allowedTypes.includes(file.type)) {
        toast({
          title: "Invalid File Type",
          variant: "destructive",
          description: "Please upload a PDF or Word document."
        });
        return;
      }

      if (file.size > maxSize) {
        toast({
          title: "File Too Large",
          variant: "destructive",
          description: "Resume must be less than 5MB."
        });
        return;
      }

      setResume(file);
      setValue('resume', file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="flex flex-row items-center justify-between">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => router.back()}
            className="mr-4"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <CardTitle className="text-4xl text-primary flex-grow text-center">
            Update Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          {formSubmissionError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <div className="flex items-center">
                <AlertCircle className="mr-2 h-5 w-5" />
                <span className="block sm:inline">{formSubmissionError}</span>
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      {...field}
                      placeholder="Enter your name"
                      aria-invalid={errors.name ? "true" : "false"}
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-destructive text-sm">{errors.name.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Email</Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      {...field}
                      type="email"
                      placeholder="Enter your email"
                      aria-invalid={errors.email ? "true" : "false"}
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-destructive text-sm">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      {...field}
                      type="tel"
                      placeholder="Enter your phone number"
                      aria-invalid={errors.phone ? "true" : "false"}
                    />
                  )}
                />
                {errors.phone && (
                  <p className="text-destructive text-sm">{errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Address</Label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input 
                      {...field}
                      placeholder="Enter your address"
                      aria-invalid={errors.address ? "true" : "false"}
                    />
                  )}
                />
                {errors.address && (
                  <p className="text-destructive text-sm">{errors.address.message}</p>
                )}
              </div>
            </div>

              {/* Job Seeker Specific Fields */}
              {user?.role === ROLES.JOB_SEEKER && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(['firstNiche', 'secondNiche', 'thirdNiche', 'fourthNiche'] as const).map((key) => (
                      <div key={key} className="space-y-2">
                        <Label>{key.replace("Niche", " Niche")}</Label>
                        <Controller
                          name={`niches.${key}`}
                          control={control}
                          render={({ field }) => (
                            <select
                              {...field}
                              className="w-full p-2 border rounded bg-transparent text-zinc-500"
                              aria-invalid={errors.niches ? "true" : "false"}
                            >
                              <option value="">Select a niche</option>
                              {NICHES.map((niche) => (
                                <option key={niche} value={niche}>
                                  {niche}
                                </option>
                              ))}
                            </select>
                          )}
                        />
                        {errors.niches && errors.niches.message && (
                          <p className="text-destructive text-sm">
                            {errors.niches.message}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Cover Letter</Label>
                    <Controller
                      name="coverLetter"
                      control={control}
                      render={({ field }) => (
                        <Textarea 
                          {...field}
                          placeholder="Enter your cover letter"
                          rows={4}
                        />
                      )}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Resume</Label>
                    <Input 
                      type="file" 
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                    />
                    {resume && (
                      <p className="text-sm text-zinc-500 mt-2">
                        Selected file: {resume.name}
                      </p>
                    )}
                  </div>
                </>
              )}
            {error && <p className="text-destructive">{error}</p>}
            <div className="flex justify-end">
              <Button 
                type="submit" 
                disabled={loading || isSubmitting}
                variant="primary"
                className={`mt-4 disabled:cursor-not-allowed disabled:bg-slate-300`}
              >
                {(loading || isSubmitting) ? (
                  <>Updating...</>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UpdateProfilePage;

