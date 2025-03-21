
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const JobCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "Full-time",
    description: "",
    requirements: "",
    applicationUrl: "",
    salaryRange: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to create a job posting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase
        .from('job_postings')
        .insert([
          {
            title: formData.title,
            company: formData.company,
            description: formData.description,
            requirements: formData.requirements,
            location: formData.location,
            application_url: formData.applicationUrl,
            salary_range: formData.salaryRange,
            mentor_id: user.id,
          }
        ])
        .select();

      if (error) {
        throw error;
      }
      
      toast({
        title: "Success!",
        description: "Your job posting has been created.",
      });
      
      navigate("/mentor/dashboard");
    } catch (error: any) {
      console.error("Error creating job posting:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create job posting. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Job Posting</h1>
        <p className="text-muted-foreground mt-1">
          Share a job opportunity with mentees
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title*</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company Name*</Label>
              <Input 
                id="company" 
                name="company" 
                value={formData.company} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Location*</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={formData.location} 
                  onChange={handleChange} 
                  required 
                  placeholder="City, State or Remote"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="type">Job Type*</Label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  required
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                  <option value="Freelance">Freelance</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="salaryRange">Salary Range</Label>
              <Input 
                id="salaryRange" 
                name="salaryRange" 
                value={formData.salaryRange} 
                onChange={handleChange} 
                placeholder="e.g. $60,000 - $80,000"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Job Description*</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={5} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="requirements">Requirements*</Label>
              <Textarea 
                id="requirements" 
                name="requirements" 
                value={formData.requirements} 
                onChange={handleChange} 
                rows={3} 
                required 
                placeholder="List the requirements, one per line"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="applicationUrl">Application URL</Label>
              <Input 
                id="applicationUrl" 
                name="applicationUrl" 
                type="url" 
                value={formData.applicationUrl} 
                onChange={handleChange} 
                placeholder="https://..."
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/mentor/dashboard")}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-techpurple-500 to-techteal-500 hover:from-techpurple-600 hover:to-techteal-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating..." : "Create Job Posting"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default JobCreate;
