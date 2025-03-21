
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const CourseCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    shortDescription: "",
    fullDescription: "",
    skillLevel: "Beginner",
    duration: "",
    category: "",
    previewImage: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Placeholder for course creation submission
      // Will be implemented with Supabase later
      
      toast({
        title: "Success!",
        description: "Your course has been created.",
      });
      
      setTimeout(() => {
        navigate("/mentor/dashboard");
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create New Course</h1>
        <p className="text-muted-foreground mt-1">
          Share your knowledge with mentees
        </p>
      </div>

      <Card className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Course Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Course Title*</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="shortDescription">Short Description*</Label>
              <Input 
                id="shortDescription" 
                name="shortDescription" 
                value={formData.shortDescription} 
                onChange={handleChange} 
                required 
                placeholder="Brief overview of your course (1-2 sentences)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="fullDescription">Full Description*</Label>
              <Textarea 
                id="fullDescription" 
                name="fullDescription" 
                value={formData.fullDescription} 
                onChange={handleChange} 
                rows={5} 
                required 
                placeholder="Detailed description of what students will learn"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="skillLevel">Skill Level*</Label>
                <select
                  id="skillLevel"
                  name="skillLevel"
                  value={formData.skillLevel}
                  onChange={handleChange}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                  required
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="duration">Estimated Duration*</Label>
                <Input 
                  id="duration" 
                  name="duration" 
                  value={formData.duration} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. 4 weeks, 10 hours"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category*</Label>
              <Input 
                id="category" 
                name="category" 
                value={formData.category} 
                onChange={handleChange} 
                required 
                placeholder="e.g. Web Development, Data Science"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="previewImage">Preview Image URL</Label>
              <Input 
                id="previewImage" 
                name="previewImage" 
                type="url" 
                value={formData.previewImage} 
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
              {isSubmitting ? "Creating..." : "Create Course"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CourseCreate;
