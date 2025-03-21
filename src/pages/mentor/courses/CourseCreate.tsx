
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const CourseCreate = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    level: "Beginner",
    duration: "",
    topics: "",
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
        description: "You must be logged in to create a course.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert topics string to array
      const topicsArray = formData.topics
        .split(',')
        .map(topic => topic.trim())
        .filter(topic => topic.length > 0);

      const { data, error } = await supabase
        .from('courses')
        .insert([
          {
            title: formData.title,
            description: formData.description,
            level: formData.level,
            duration: formData.duration,
            topics: topicsArray,
            mentor_id: user.id,
          }
        ])
        .select();

      if (error) {
        throw error;
      }
      
      toast({
        title: "Success!",
        description: "Your course has been created.",
      });
      
      navigate("/mentor/dashboard");
    } catch (error: any) {
      console.error("Error creating course:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to create course. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Create Course</h1>
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
              <Label htmlFor="description">Course Description*</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                rows={5} 
                required 
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">Difficulty Level*</Label>
                <select
                  id="level"
                  name="level"
                  value={formData.level}
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
                <Label htmlFor="duration">Duration*</Label>
                <Input 
                  id="duration" 
                  name="duration" 
                  value={formData.duration} 
                  onChange={handleChange} 
                  required 
                  placeholder="e.g. 6 weeks, 3 months"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="topics">Topics (comma separated)*</Label>
              <Input 
                id="topics" 
                name="topics" 
                value={formData.topics} 
                onChange={handleChange} 
                required 
                placeholder="e.g. JavaScript, React, CSS"
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
