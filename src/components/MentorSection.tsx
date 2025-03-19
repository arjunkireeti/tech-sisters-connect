
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useAnimateOnScroll } from '@/lib/animations';
import { ArrowRight, LinkedinIcon, Twitter, Globe } from 'lucide-react';

type Mentor = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  specialties: string[];
  socials: {
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
};

const mentors: Mentor[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Software Engineer',
    company: 'Google',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    specialties: ['Full Stack', 'React', 'Node.js'],
    socials: {
      linkedin: '#',
      twitter: '#',
      website: '#',
    },
  },
  {
    id: 2,
    name: 'Michelle Chen',
    role: 'Product Manager',
    company: 'Microsoft',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    specialties: ['Product Strategy', 'UX Research', 'Agile'],
    socials: {
      linkedin: '#',
      website: '#',
    },
  },
  {
    id: 3,
    name: 'Aisha Williams',
    role: 'UX Designer',
    company: 'Adobe',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    specialties: ['UI/UX', 'Design Systems', 'User Research'],
    socials: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 4,
    name: 'Priya Sharma',
    role: 'Data Scientist',
    company: 'Amazon',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
    specialties: ['Machine Learning', 'Python', 'Data Analysis'],
    socials: {
      linkedin: '#',
      twitter: '#',
      website: '#',
    },
  },
];

export function MentorSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [ref, isVisible] = useAnimateOnScroll();

  return (
    <section 
      id="mentors" 
      className="section-padding relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-techpurple-100/50 dark:bg-techpurple-900/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-techteal-100/50 dark:bg-techteal-900/20 rounded-full blur-3xl" />
      
      <div className="container-custom relative z-10">
        <div 
          className={`space-y-3 text-center max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`}
          ref={ref as any}
        >
          <div className="inline-flex rounded-full bg-techteal-100 px-3 py-1 text-sm font-medium text-techteal-800 dark:bg-techteal-900/30 dark:text-techteal-300">
            Our Mentors
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Learn from <span className="text-transparent bg-clip-text bg-gradient-to-r from-techpurple-500 to-techteal-500">industry leaders</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Connect with experienced mentors who are passionate about helping women succeed in technology careers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {mentors.map((mentor, index) => (
            <Card 
              key={mentor.id}
              className="overflow-hidden transition-all duration-500 delay-100 opacity-0 translate-y-10 animate-fade-in-up glass-card card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <img 
                  src={mentor.image} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <div className="flex justify-end gap-2">
                    {mentor.socials.linkedin && (
                      <a href={mentor.socials.linkedin} className="text-white/90 hover:text-white transition-colors">
                        <LinkedinIcon className="w-5 h-5" />
                      </a>
                    )}
                    {mentor.socials.twitter && (
                      <a href={mentor.socials.twitter} className="text-white/90 hover:text-white transition-colors">
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {mentor.socials.website && (
                      <a href={mentor.socials.website} className="text-white/90 hover:text-white transition-colors">
                        <Globe className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-bold text-xl">{mentor.name}</h3>
                <div className="text-sm text-foreground/70">
                  <p>{mentor.role}</p>
                  <p>{mentor.company}</p>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  {mentor.specialties.map(specialty => (
                    <span key={specialty} className="tech-chip bg-techpurple-100 text-techpurple-800 dark:bg-techpurple-900/30 dark:text-techpurple-300">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button
            variant="outline"
            size="lg"
            className="border-2 bg-white/50 backdrop-blur-sm dark:bg-transparent border-techpurple-200 dark:border-techpurple-800 text-foreground hover:border-techpurple-300 dark:hover:border-techpurple-700 font-medium py-6 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
          >
            View All Mentors
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
}
