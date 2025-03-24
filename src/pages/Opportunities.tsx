
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon, ExternalLinkIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type JobPosting = {
  id: string;
  title: string;
  company: string;
  location: string | null;
  description: string;
  application_url: string | null;
  created_at: string;
  mentor_id: string;
};

const Opportunities = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        console.log('Fetching jobs from Supabase...');
        const { data, error } = await supabase
          .from('job_postings')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Supabase error:', error);
          throw error;
        }

        console.log('Jobs fetched:', data);
        setJobs(data || []);
      } catch (error: any) {
        console.error('Error fetching jobs:', error);
        toast({
          title: 'Error',
          description: 'Failed to load job opportunities.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [toast]);

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Job Opportunities</h1>
          <p className="text-lg text-muted-foreground">
            Discover the latest tech jobs shared by our mentors
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <BriefcaseIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50 mb-4" />
            <h3 className="text-xl font-medium">No job postings available</h3>
            <p className="text-muted-foreground mt-2">
              Check back later for new opportunities
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {jobs.map((job) => (
              <Card key={job.id} className="transition-all hover:shadow-md">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="text-base mt-1">
                        {job.company} • {job.location || 'Remote'}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-3">{job.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-2">
                  <div className="text-sm text-muted-foreground">
                    Posted {new Date(job.created_at).toLocaleDateString()}
                  </div>
                  {job.application_url ? (
                    <Button asChild size="sm">
                      <a href={job.application_url} target="_blank" rel="noopener noreferrer">
                        Apply <ExternalLinkIcon className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ) : (
                    <Button disabled size="sm">No Application Link</Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Opportunities;
