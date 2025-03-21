
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Briefcase, Book, FileEdit, Plus } from 'lucide-react';

export default function MentorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mentor Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Manage your job postings and courses
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate(activeTab === 'jobs' ? '/mentor/jobs/new' : '/mentor/courses/new')}
            className="bg-gradient-to-r from-techpurple-500 to-techteal-500 hover:from-techpurple-600 hover:to-techteal-600"
          >
            <Plus className="mr-2 h-4 w-4" />
            {activeTab === 'jobs' ? 'Add Job Posting' : 'Add Course'}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="jobs" onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="jobs" className="flex items-center justify-center">
            <Briefcase className="mr-2 h-4 w-4" />
            Job Postings
          </TabsTrigger>
          <TabsTrigger value="courses" className="flex items-center justify-center">
            <Book className="mr-2 h-4 w-4" />
            Courses
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="jobs" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Your Job Postings</CardTitle>
                <CardDescription>
                  Create and manage career opportunities for mentees
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You haven't created any job postings yet.</p>
                  <Button 
                    variant="outline"
                    className="mt-4"
                    onClick={() => navigate('/mentor/jobs/new')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Job Posting
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="courses" className="mt-6">
          <div className="grid gap-6">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Your Courses</CardTitle>
                <CardDescription>
                  Share your knowledge through structured courses
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">You haven't created any courses yet.</p>
                  <Button 
                    variant="outline"
                    className="mt-4"
                    onClick={() => navigate('/mentor/courses/new')}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Create Your First Course
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
