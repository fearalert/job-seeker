"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { Plus, Trash2, Info } from "lucide-react";
import { JOB_TYPE, NICHES } from "@/constants";
import { AppDispatch, RootState } from "@/store/store";
import { toast } from "@/hooks/use-toast";
import { postJob } from "@/store/slices/job.slice";
import AuthHeader from "@/components/navbar/AuthenticatedHeader";
import LoadingView from "@/app/loading";

const organizationTypes = [
  "Startup",
  "Enterprise",
  "Non-Profit",
  "Government",
  "Educational",
];

interface JobPostFormData {
  jobTitle: string;
  jobType: string;
  organizationType: string;
  location: string;
  jobIntroduction: string;
  jobResponsibilities: string[];
  salary: number;
  jobValidThrough: string;
  jobBenefits: string[];
  jobQualifications: string[];
  hiringMultipleCandidates: boolean;
  jobNiche: string;
  newsLettersSent: boolean;
  howToApply: string;
  personalWebsite: { title: string; url: string };
}

export default function JobPostForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, message } = useSelector(
    (state: RootState) => state.jobs
  );
  const { user } = useSelector((state: RootState) => state.user);

  const initialState = {
    jobTitle: "",
    jobType: "",
    organizationType: "",
    location: "",
    jobIntroduction: "",
    jobResponsibilities: [""],
    salary: 0,
    jobValidThrough: "",
    jobBenefits: [""],
    jobQualifications: [""],
    hiringMultipleCandidates: false,
    jobNiche: "",
    newsLettersSent: false,
    howToApply: "",
    personalWebsite: { title: "", url: "" },
  }

  const [formData, setFormData] = useState<JobPostFormData>(initialState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (
    field: keyof JobPostFormData,
    index: number,
    value: string
  ) => {
    const updatedArray = [...(formData[field] as string[])];
    updatedArray[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updatedArray }));
  };

  const addArrayField = (field: keyof JobPostFormData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }));
  };

  const removeArrayField = (field: keyof JobPostFormData, index: number) => {
    const updatedArray = [...(formData[field] as string[])];
    updatedArray.splice(index, 1);
    setFormData((prev) => ({ ...prev, [field]: updatedArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!formData.jobTitle || !formData.jobType || !formData.location || !formData.organizationType) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.jobResponsibilities) {
      toast({
        title: "Validation Error",
        description: "Please fill out at least one job Responsibility.",
        variant: "destructive",
      });
      return;
    }
    
    if (!formData.jobQualifications) {
      toast({
        title: "Validation Error",
        description: "Please fill out at least one job Qualifications.",
        variant: "destructive",
      });
      return;
    }

    if (!formData.jobQualifications) {
      toast({
        title: "Validation Error",
        description: "Please fill out how to apply.",
        variant: "destructive",
      });
      return;
    }

    if (new Date(formData.jobValidThrough) < new Date()) {
      toast({
        title: "Validation Error",
        description: "Job valid through date must be in the future.",
        variant: "destructive",
      });
      return;
    }
  
    try {
      const payload = {
        ...formData,
        salary: formData.salary.toString(),
      };
  
      await dispatch(postJob(payload));
  
      toast({
        title: "Job Posted Successfully",
        description: message,
      });
  
      // Reset form
      setFormData(initialState);
    } catch (err: any) {
      toast({
        title: "Error",
        description: error || "Failed to post job.",
        variant: "destructive",
      });
    }
  };
  

  const renderDynamicArrayField = (
    field: keyof JobPostFormData,
    placeholder: string
  ) => (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <Label className="capitalize">
          {field.replace(/([A-Z])/g, " $1")}
          {["jobResponsibilities", "jobQualifications"].includes(field) && (
            <span>*</span>
          )}
           {["jobBenefits"].includes(field) && (
            <span> (Optional)</span>
          )}
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addArrayField(field)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
      {(formData[field] as string[]).map((item, index) => (
        <div key={index} className="flex items-center space-x-2 mb-2">
          <Input
            value={item}
            onChange={(e) => handleArrayChange(field, index, e.target.value)}
            placeholder={placeholder}
            className="flex-grow"
          />
          {(formData[field] as string[]).length > 1 && (
            <Button
              type="button"
              variant="destructive"
              size="icon"
              onClick={() => removeArrayField(field, index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
    </div>
  );


  if (loading) {
    return <LoadingView />
  }

  return (
    <>
      <AuthHeader title="Post Job" />
      <div className="md:flex md:flex-col md:items-center md:justify-center md:min-w-[1200px] h-full w-full mx-auto px-4 py-8">
        <Card className="w-full lg:min-w-[1000px] md:min-w-[700px] bg-background hover:bg-background">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">Post a New Job</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title and Type */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Job Title *</Label>
                  <Input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Senior Software Engineer"
                    required
                  />
                </div>
                <div>
                  <Label>Job Type *</Label>
                  <Select
                    value={formData.jobType}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, jobType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_TYPE.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Organization and Location */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Job Niche */}
                <div>
                  <Label>Job Niche *</Label>
                  <Select
                    value={formData.jobNiche}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, jobNiche: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Niche" />
                    </SelectTrigger>
                    <SelectContent>
                      {NICHES.map((niche) => (
                        <SelectItem key={niche} value={niche}>
                          {niche}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Location *</Label>
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Kathmandu, Nepal"
                    required
                  />
                </div>
              </div>

              {/* Organization Type */}
              <div>
                <Label>Organization Type *</Label>
                <Select
                  value={formData.organizationType}
                  onValueChange={(value) =>
                    setFormData((prev) => ({ ...prev, organizationType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Organization Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizationTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Job Introduction */}
              <div>
                <Label>Job Introduction *</Label>
                <Textarea
                  name="jobIntroduction"
                  value={formData.jobIntroduction}
                  onChange={handleChange}
                  placeholder="Brief introduction about the job."
                  required
                />
              </div>

              {renderDynamicArrayField(
                "jobResponsibilities",
                "Enter a job responsibility"
              )}
              {renderDynamicArrayField(
                "jobQualifications",
                "Enter a qualification"
              )}
              {renderDynamicArrayField("jobBenefits", "Enter a benefit")}

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>
                    Salary (NRS){" "}
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 ml-1 inline" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Enter the salary or leave as 0 if not applicable.
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                  <Input
                    type="number"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="50000"
                    min={0}
                  />
                </div>
                <div>
                  <Label>Job Valid Through *</Label>
                  <Input
                    type="date"
                    name="jobValidThrough"
                    value={formData.jobValidThrough}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Personal Website */}
              <div>
                <Label>Personal Website</Label>
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    name="personalWebsite.title"
                    value={formData.personalWebsite?.title || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalWebsite: {
                          ...prev.personalWebsite,
                          title: e.target.value || "",
                        },
                      }))
                    }
                    placeholder="Website Title"
                  />
                  <Input
                    name="personalWebsite.url"
                    value={formData.personalWebsite?.url || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        personalWebsite: {
                          ...prev.personalWebsite,
                          url: e.target.value || "",
                        },
                      }))
                    }
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              {/* How to Apply */}
              <div>
                <Label>How to Apply *</Label>
                <Textarea
                  name="howToApply"
                  value={formData.howToApply}
                  onChange={handleChange}
                  placeholder="Provide instructions for applying to the job."
                  required
                />
              </div>

              {/* Additional Fields */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <Checkbox
                    className="border border-zinc-400"
                    id="hiringMultipleCandidates"
                    checked={formData.hiringMultipleCandidates}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({
                        ...prev,
                        hiringMultipleCandidates: !!checked,
                      }))
                    }
                  />
                  <Label htmlFor="hiringMultipleCandidates" className="ml-2">
                    Hiring Multiple Candidates
                    <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 ml-1 inline" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Please tick the checkbox if you are hiring multiple Candidates.
                      </TooltipContent>
                    </Tooltip>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                <Checkbox 
                  className="border border-zinc-400"
                  id="newsLettersSent"
                  checked={formData.newsLettersSent}
                  onCheckedChange={(checked) => setFormData(prev => ({ 
                    ...prev, 
                    newsLettersSent: !!checked 
                  }))}
                />
                <Label htmlFor="newsLettersSent">
                  Send Newsletter
                  <Tooltip>
                      <TooltipTrigger>
                        <Info className="h-4 w-4 ml-1 inline" />
                      </TooltipTrigger>
                      <TooltipContent>
                        Please tick the checkbox if you want Job Seeker of the Same Niches to be Notified.
                      </TooltipContent>
                    </Tooltip>
                </Label>
              </div>
            </div>

              {/* Submit Button */}
              <Button type="submit" disabled={loading} className="w-full" variant="primary">
                {loading ? "Submitting..." : "Post Job"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
