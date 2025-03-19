
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="min-h-screen pt-28 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 -right-64 w-[40rem] h-[40rem] bg-techpurple-100/30 dark:bg-techpurple-900/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-64 -left-64 w-[50rem] h-[50rem] bg-techteal-100/40 dark:bg-techteal-900/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          <div className={`space-y-6 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex rounded-full bg-techpurple-100 px-3 py-1 text-sm font-medium text-techpurple-800 dark:bg-techpurple-900/30 dark:text-techpurple-300">
              Empowering Women in Technology
            </div>

            <h1 className="font-bold text-5xl sm:text-6xl md:text-7xl leading-[1.1] tracking-tight">
              Connect. <span className="text-transparent bg-clip-text bg-gradient-to-r from-techpurple-500 to-techteal-500">Learn.</span> Thrive.
            </h1>

            <p className="text-xl text-foreground/80 max-w-2xl">
              Join a community that connects women with mentors, resources, and opportunities in the technology industry. Break barriers and build your future in tech.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-techpurple-500 to-techteal-500 hover:from-techpurple-600 hover:to-techteal-600 text-white font-medium py-6 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                Find a Mentor
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 bg-white/70 backdrop-blur-sm dark:bg-transparent border-techpurple-200 dark:border-techpurple-800 text-foreground hover:border-techpurple-300 dark:hover:border-techpurple-700 font-medium py-6 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                Explore Resources
              </Button>
            </div>
          </div>

          <div className={`relative ${isLoaded ? 'animate-fade-in' : 'opacity-0'} animation-delay-300`}>
            <div className="aspect-square max-w-full h-auto rounded-2xl overflow-hidden relative shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-techpurple-500/20 to-techteal-500/20 mix-blend-overlay z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Women in technology collaborating" 
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>

            {/* Floating elements */}
            <div className="absolute -top-8 -right-8 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg animate-float">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-techpurple-100 rounded-full flex items-center justify-center">
                  <span className="text-techpurple-600 font-bold text-sm">5k+</span>
                </div>
                <span className="font-medium text-sm">Mentors Worldwide</span>
              </div>
            </div>

            <div className="absolute -bottom-8 -left-8 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-lg animate-float animation-delay-1000">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-techteal-100 rounded-full flex items-center justify-center">
                  <span className="text-techteal-600 font-bold text-sm">10k+</span>
                </div>
                <span className="font-medium text-sm">Opportunities Listed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
