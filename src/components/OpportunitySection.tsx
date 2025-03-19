
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAnimateOnScroll } from '@/lib/animations';
import { ArrowRight, Building, Calendar, GraduationCap, Briefcase, MapPin, Clock } from 'lucide-react';

type Opportunity = {
  id: number;
  title: string;
  organization: string;
  location: string;
  remote: boolean;
  deadline: string;
  image: string;
  type: 'job' | 'internship' | 'scholarship' | 'event';
  category: string;
};

const opportunities: Opportunity[] = [
  {
    id: 1,
    title: 'Software Engineer',
    organization: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    remote: true,
    deadline: '2023-12-15',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    type: 'job',
    category: 'engineering',
  },
  {
    id: 2,
    title: 'UX/UI Design Internship',
    organization: 'DesignHub',
    location: 'New York, NY',
    remote: false,
    deadline: '2023-11-30',
    image: 'https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    type: 'internship',
    category: 'design',
  },
  {
    id: 3,
    title: 'Women in Tech Conference',
    organization: 'TechDiversity Foundation',
    location: 'Chicago, IL',
    remote: false,
    deadline: '2023-12-10',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    type: 'event',
    category: 'events',
  },
  {
    id: 4,
    title: 'Data Science Scholarship',
    organization: 'AI Learning Institute',
    location: 'Online',
    remote: true,
    deadline: '2023-11-15',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    type: 'scholarship',
    category: 'education',
  },
  {
    id: 5,
    title: 'Front-End Developer',
    organization: 'WebSolutions',
    location: 'Austin, TX',
    remote: true,
    deadline: '2023-12-05',
    image: 'https://images.unsplash.com/photo-1545665277-5937489579f2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    type: 'job',
    category: 'engineering',
  },
  {
    id: 6,
    title: 'Product Management Workshop',
    organization: 'ProductHQ',
    location: 'Seattle, WA',
    remote: false,
    deadline: '2023-11-20',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    type: 'event',
    category: 'events',
  },
  {
    id: 7,
    title: 'Cybersecurity Analyst',
    organization: 'SecureNet',
    location: 'Washington, DC',
    remote: false,
    deadline: '2023-12-20',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    type: 'job',
    category: 'engineering',
  },
  {
    id: 8,
    title: 'STEM Research Grant',
    organization: 'Future Tech Foundation',
    location: 'Various Locations',
    remote: true,
    deadline: '2023-12-31',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    type: 'scholarship',
    category: 'education',
  },
];

function formatDeadline(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function getTypeIcon(type: string) {
  switch (type) {
    case 'job':
      return Briefcase;
    case 'internship':
      return Building;
    case 'scholarship':
      return GraduationCap;
    case 'event':
      return Calendar;
    default:
      return Briefcase;
  }
}

export function OpportunitySection() {
  const [headerRef, headerVisible] = useAnimateOnScroll();
  
  const categories = [
    { id: 'all', label: 'All Opportunities' },
    { id: 'engineering', label: 'Engineering' },
    { id: 'design', label: 'Design' },
    { id: 'events', label: 'Events' },
    { id: 'education', label: 'Education' },
  ];

  return (
    <section id="opportunities" className="section-padding relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-techteal-100/20 to-transparent dark:from-techteal-900/10 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-techpurple-100/20 to-transparent dark:from-techpurple-900/10 blur-3xl" />
      
      <div className="container-custom relative z-10">
        <div 
          className={`space-y-3 text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`}
          ref={headerRef as any}
        >
          <div className="inline-flex rounded-full bg-techteal-100 px-3 py-1 text-sm font-medium text-techteal-800 dark:bg-techteal-900/30 dark:text-techteal-300">
            Career Opportunities
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-techpurple-500 to-techteal-500">opportunities</span> in tech
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Find jobs, internships, events, and scholarships tailored for women in technology.
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {opportunities
                  .filter(opportunity => category.id === 'all' || opportunity.category === category.id)
                  .map((opportunity, index) => {
                    const TypeIcon = getTypeIcon(opportunity.type);
                    return (
                      <Card 
                        key={opportunity.id}
                        className="overflow-hidden glass-card card-hover"
                      >
                        <div className="relative aspect-[3/2] overflow-hidden">
                          <img 
                            src={opportunity.image} 
                            alt={opportunity.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute top-3 left-3">
                            <div className="flex items-center gap-1.5 bg-white dark:bg-gray-900 rounded-full py-1 px-3 text-xs font-medium shadow-md">
                              <TypeIcon className="w-3.5 h-3.5" />
                              <span className="capitalize">{opportunity.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="p-5 space-y-4">
                          <div>
                            <h3 className="font-bold text-lg line-clamp-2">{opportunity.title}</h3>
                            <p className="text-sm text-foreground/80 flex items-center mt-1">
                              <Building className="w-4 h-4 mr-1.5" />
                              {opportunity.organization}
                            </p>
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex items-start gap-1.5 text-sm text-foreground/70">
                              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                              <span>{opportunity.location} {opportunity.remote && '(Remote Available)'}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-sm text-foreground/70">
                              <Clock className="w-4 h-4 flex-shrink-0" />
                              <span>Deadline: {formatDeadline(opportunity.deadline)}</span>
                            </div>
                          </div>

                          <Button
                            variant="outline"
                            className="w-full border-techpurple-200 hover:border-techpurple-300 dark:border-techpurple-800 dark:hover:border-techpurple-700 mt-2 group"
                          >
                            View Details
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </div>
                      </Card>
                    );
                  })}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-techpurple-500 to-techteal-500 hover:from-techpurple-600 hover:to-techteal-600 text-white font-medium py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            Browse All Opportunities
          </Button>
        </div>
      </div>
    </section>
  );
}
