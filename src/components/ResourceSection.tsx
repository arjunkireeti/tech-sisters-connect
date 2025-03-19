
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnimateOnScroll } from '@/lib/animations';
import { ArrowUpRight, Book, Video, FileText, Users, BookOpen, Code } from 'lucide-react';

type Resource = {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  type: 'course' | 'article' | 'video' | 'community' | 'book' | 'toolkit';
  typeIcon: (props: any) => JSX.Element;
};

const resources: Resource[] = [
  {
    id: 1,
    title: 'Introduction to Web Development',
    description: 'Learn HTML, CSS, and JavaScript fundamentals to start your web development journey.',
    image: 'https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'beginner',
    type: 'course',
    typeIcon: Book,
  },
  {
    id: 2,
    title: 'Navigating Tech Interviews as a Woman',
    description: 'Practical strategies and tips for overcoming bias and showcasing your skills effectively.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'career',
    type: 'article',
    typeIcon: FileText,
  },
  {
    id: 3,
    title: 'Data Science Fundamentals',
    description: 'Introduction to key concepts in data science, statistics, and machine learning.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'data',
    type: 'course',
    typeIcon: Book,
  },
  {
    id: 4,
    title: 'Building Inclusive Tech Teams',
    description: 'Strategies for creating and fostering diverse and inclusive technical teams.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'leadership',
    type: 'video',
    typeIcon: Video,
  },
  {
    id: 5,
    title: 'Women in Tech Community',
    description: 'Join a supportive network of women in various technology fields to share experiences and advice.',
    image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'community',
    type: 'community',
    typeIcon: Users,
  },
  {
    id: 6,
    title: 'Mobile App Development with React Native',
    description: 'Learn to build cross-platform mobile applications using React Native.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'development',
    type: 'course',
    typeIcon: Book,
  },
  {
    id: 7,
    title: 'UX Design for Beginners',
    description: 'Introduction to user experience design principles and methodologies.',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'design',
    type: 'toolkit',
    typeIcon: BookOpen,
  },
  {
    id: 8,
    title: 'Coding Interview Preparation',
    description: 'Practice problems and strategies to prepare for technical coding interviews.',
    image: 'https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    category: 'career',
    type: 'toolkit',
    typeIcon: Code,
  },
];

const categories = [
  { id: 'all', label: 'All Resources' },
  { id: 'beginner', label: 'For Beginners' },
  { id: 'career', label: 'Career Growth' },
  { id: 'development', label: 'Development' },
  { id: 'design', label: 'Design' },
  { id: 'data', label: 'Data Science' },
  { id: 'leadership', label: 'Leadership' },
];

export function ResourceSection() {
  const [headerRef, headerVisible] = useAnimateOnScroll();
  
  return (
    <section id="resources" className="section-padding relative bg-muted/50">
      {/* Background decoration */}
      <div className="absolute -top-64 left-1/2 transform -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-techpurple-100/20 to-techteal-100/20 dark:from-techpurple-900/10 dark:to-techteal-900/10 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <div 
          className={`space-y-3 text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`}
          ref={headerRef as any}
        >
          <div className="inline-flex rounded-full bg-techpurple-100 px-3 py-1 text-sm font-medium text-techpurple-800 dark:bg-techpurple-900/30 dark:text-techpurple-300">
            Learning Resources
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Access <span className="text-transparent bg-clip-text bg-gradient-to-r from-techpurple-500 to-techteal-500">quality resources</span> to grow
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Discover courses, articles, videos, and communities that will help you develop your skills and advance your tech career.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="relative mb-8">
            <TabsList className="h-auto p-1 bg-background/70 backdrop-blur-sm border border-border/50 rounded-full flex flex-wrap justify-center">
              {categories.map(category => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="rounded-full px-4 py-2 data-[state=active]:shadow-md transition-all"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {categories.map(category => (
            <TabsContent key={category.id} value={category.id} className="mt-4 focus-visible:outline-none focus-visible:ring-0">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {resources
                  .filter(resource => category.id === 'all' || resource.category === category.id)
                  .map((resource, index) => (
                    <Card 
                      key={resource.id}
                      className="overflow-hidden glass-card card-hover"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img 
                          src={resource.image} 
                          alt={resource.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute top-3 left-3">
                          <div className="flex items-center gap-1.5 bg-white dark:bg-gray-900 rounded-full py-1 px-3 text-xs font-medium shadow-md">
                            <resource.typeIcon className="w-3.5 h-3.5" />
                            <span className="capitalize">{resource.type}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-5 space-y-3">
                        <h3 className="font-bold text-lg line-clamp-2">{resource.title}</h3>
                        <p className="text-sm text-foreground/70 line-clamp-3">{resource.description}</p>
                        <Button
                          variant="ghost"
                          className="px-0 text-techpurple-600 dark:text-techpurple-400 hover:text-techpurple-700 dark:hover:text-techpurple-300 hover:bg-transparent font-medium group"
                        >
                          Learn More
                          <ArrowUpRight className="ml-1.5 w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Button>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-techpurple-500 to-techteal-500 hover:from-techpurple-600 hover:to-techteal-600 text-white font-medium py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Browse All Resources
          </Button>
        </div>
      </div>
    </section>
  );
}
