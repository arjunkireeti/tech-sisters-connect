
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpenIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type Course = {
  id: string;
  title: string;
  description: string;
  level: string;
  duration: string;
  topics: string[];
  created_at: string;
  mentor_id: string;
};

const Resources = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data, error } = await supabase
          .from('courses')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          throw error;
        }

        setCourses(data as Course[]);
      } catch (error: any) {
        console.error('Error fetching courses:', error);
        toast({
          title: 'Error',
          description: 'Failed to load courses.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [toast]);

  // Helper function to get badge color based on level
  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-100';
      case 'advanced':
        return 'bg-purple-100 text-purple-800 hover:bg-purple-100';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Learning Resources</h1>
          <p className="text-lg text-muted-foreground">
            Explore courses and learning materials shared by our mentors
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-20">
            <BookOpenIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-xl font-medium">No courses available</h3>
            <p className="text-muted-foreground mt-2">
              Check back later for new resources
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="h-full transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex flex-wrap gap-1 mb-2">
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                    <Badge variant="outline">{course.duration}</Badge>
                  </div>
                  <CardTitle className="text-xl">{course.title}</CardTitle>
                  <CardDescription className="text-sm mt-1">
                    Posted {new Date(course.created_at).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{course.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {course.topics && course.topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
