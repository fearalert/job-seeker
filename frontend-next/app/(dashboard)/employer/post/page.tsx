"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from 'lucide-react';
import { JOB_TYPE, NICHES } from '@/constants';
import { AppDispatch, RootState } from '@/store/store';
import { toast } from '@/hooks/use-toast';
import { postJob } from '@/store/slices/job.slice';
import AuthHeader from '@/components/navbar/AuthenticatedHeader';

const organizationTypes = [
  'Startup', 'Enterprise', 'Non-Profit', 'Government', 'Educational'
];

interface JobPostFormData {
  jobTitle: string;
  jobType: string;
  organizationName: string | undefined;
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
  personalWebsite?: { title: string; url: string };
}

export function JobPostForm() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, message } = useSelector((state: RootState) => state.jobs);
  const { user } = useSelector((state: RootState) => state.user);

  const [formData, setFormData] = useState<JobPostFormData>({
    jobTitle: '',
    jobType: '',
    organizationName: user?.name,
    organizationType: '',
    location: '',
    jobIntroduction: '',
    jobResponsibilities: [''],
    salary: 0,
    jobValidThrough: '',
    jobBenefits: [''],
    jobQualifications: [''],
    hiringMultipleCandidates: false,
    jobNiche: '',
    newsLettersSent: false,
    howToApply: '',
    personalWebsite: { title: '', url: '' },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (field: keyof JobPostFormData, index: number, value: string) => {
    const updatedArray = [...formData[field] as string[]];
    updatedArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: updatedArray }));
  };

  const addArrayField = (field: keyof JobPostFormData) => {
    setFormData(prev => ({
      ...prev, 
      [field]: [...(prev[field] as string[]), '']
    }));
  };

  const removeArrayField = (field: keyof JobPostFormData, index: number) => {
    const updatedArray = formData[field] as string[];
    updatedArray.splice(index, 1);
    setFormData(prev => ({ ...prev, [field]: updatedArray }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.jobTitle || !formData.jobType || !formData.organizationName || !formData.location) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    try {
      await dispatch(postJob(formData));

      if (message) {
        toast({
          title: "Job Posted Successfully",
          description: message
        });

        // Reset form
        setFormData({
          jobTitle: '',
          jobType: '',
          organizationName: '',
          organizationType: '',
          location: '',
          jobIntroduction: '',
          jobResponsibilities: [''],
          salary: 0,
          jobValidThrough: '',
          jobBenefits: [''],
          jobQualifications: [''],
          hiringMultipleCandidates: false,
          jobNiche: '',
          newsLettersSent: false,
          howToApply: '',
          personalWebsite: { title: '', url: '' },
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: error || "Failed to post job",
        variant: "destructive"
      });
    }
  };

  const renderDynamicArrayField = (
    field: keyof JobPostFormData, 
    placeholder: string
  ) => (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <Label className="capitalize">{field.replace(/([A-Z])/g, ' $1')}</Label>
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

  return (
    <>
    <AuthHeader title='Post Job'/>
    <div className="md:flex md:flex-col md:items-center md:justify-center md:min-w-[1600px] w-full mx-auto px-4 py-8">
      <Card className="w-full lg:min-w-[1000px] md:min-w-[700px] bg-background hover:bg-background">
        <CardHeader>
          <CardTitle className="text-2xl text-primary">Post a New Job</CardTitle>
        </CardHeader>
        <CardContent className="w-full">
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="w-full">
                <Label>Job Title *</Label>
                <Input 
                  name="jobTitle"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  placeholder="E.g. Senior Software Engineer"
                  className="w-full placeholder:text-zinc-400 text-zinc-800"
                  required
                />
              </div>
              <div className="w-full">
                <Label>Job Type *</Label>
                <Select 
                  value={formData.jobType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, jobType: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Job Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {JOB_TYPE.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Organization and Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="w-full">
                <Label>Organization Type *</Label>
                <Select 
                  value={formData.organizationType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, organizationType: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Organization Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {organizationTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Label>Location *</Label>
                <Input 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="San Francisco, CA"
                  className="w-full"
                  required
                />
              </div>
            </div>

            {/* Job Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="w-full">
                <Label>Job Niche *</Label>
                <Select 
                  value={formData.jobNiche}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, jobNiche: value }))}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Job Niche" />
                  </SelectTrigger>
                  <SelectContent>
                    {NICHES.map(niche => (
                      <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="w-full">
                <Label>How to Apply</Label>
                <Input 
                  name="howToApply"
                  value={formData.howToApply}
                  onChange={handleChange}
                  placeholder="Application instructions"
                  className="w-full placeholder:text-zinc-300"
                />
              </div>
            </div>

            {/* Job Introduction */}
            <div className="w-full">
              <Label>Job Introduction *</Label>
              <Textarea 
                name="jobIntroduction"
                value={formData.jobIntroduction}
                onChange={handleChange}
                placeholder="Describe the job briefly..."
                className="min-h-[120px] w-full text-zinc-800 placeholder:text-zinc-400"
              />
            </div>

            {/* Dynamic Array Fields */}
            <div className="space-y-4 w-full">
              {renderDynamicArrayField('jobResponsibilities', 'Responsibility description')}
              {renderDynamicArrayField('jobQualifications', 'Qualification description')}
              {renderDynamicArrayField('jobBenefits', 'Benefit description')}
            </div>

            {/* Salary and Validity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              <div className="w-full">
                <Label>Salary (NRS.)</Label>
                <Input 
                  type="text"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  placeholder="Enter annual salary"
                  className="w-full"
                />
              </div>
              <div className="w-full">
                <Label>Job Valid Through</Label>
                <Input 
                  type="date"
                  name="jobValidThrough"
                  value={formData.jobValidThrough}
                  onChange={handleChange}
                  className="w-full"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap items-center gap-4 w-full">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="hiringMultipleCandidates"
                  checked={formData.hiringMultipleCandidates}
                  onCheckedChange={(checked) => setFormData(prev => ({ 
                    ...prev, 
                    hiringMultipleCandidates: !!checked 
                  }))}
                />
                <Label htmlFor="hiringMultipleCandidates">
                  Hiring Multiple Candidates
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="newsLettersSent"
                  checked={formData.newsLettersSent}
                  onCheckedChange={(checked) => setFormData(prev => ({ 
                    ...prev, 
                    newsLettersSent: !!checked 
                  }))}
                />
                <Label htmlFor="newsLettersSent">
                  Send Newsletter
                </Label>
              </div>
            </div>

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full" 
              variant='primary'
              disabled={loading}
            >
              {loading ? 'Posting...' : 'Post Job'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </>
  );
}

export default JobPostForm;