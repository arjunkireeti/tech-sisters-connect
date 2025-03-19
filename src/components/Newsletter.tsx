
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useAnimateOnScroll } from '@/lib/animations';
import { CheckCircle2, Mail } from 'lucide-react';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [ref, isVisible] = useAnimateOnScroll();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive updates on opportunities and resources.",
        variant: "default",
      });
    }, 1500);
  };

  return (
    <section id="community" className="section-padding bg-gradient-to-br from-techpurple-500/10 to-techteal-500/10 dark:from-techpurple-900/20 dark:to-techteal-900/20">
      <div 
        className="container-custom max-w-4xl mx-auto"
        ref={ref as any}
      >
        <div 
          className={`glass-card rounded-3xl p-8 md:p-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
            <div className="md:w-1/2 space-y-4">
              <div className="inline-flex rounded-full bg-techpurple-100 px-3 py-1 text-sm font-medium text-techpurple-800 dark:bg-techpurple-900/30 dark:text-techpurple-300">
                Join Our Community
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Stay updated with the latest opportunities
              </h2>
              <p className="text-foreground/70">
                Subscribe to our newsletter to receive updates on new mentorship programs, career opportunities, and resources.
              </p>
            </div>
            
            <div className="md:w-1/2 w-full">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50 w-5 h-5" />
                    <Input
                      type="email"
                      placeholder="Enter your email address"
                      className="pl-10 py-6 bg-background/80 border-border/50 rounded-xl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-techpurple-500 to-techteal-500 hover:from-techpurple-600 hover:to-techteal-600 text-white py-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                    disabled={isLoading}
                  >
                    {isLoading ? "Subscribing..." : "Subscribe to Newsletter"}
                  </Button>
                  <p className="text-xs text-center text-foreground/50">
                    We respect your privacy. Unsubscribe at any time.
                  </p>
                </form>
              ) : (
                <div className="text-center space-y-4 py-6">
                  <div className="flex justify-center">
                    <div className="rounded-full bg-techpurple-100 dark:bg-techpurple-900/30 p-3">
                      <CheckCircle2 className="w-8 h-8 text-techpurple-600 dark:text-techpurple-400" />
                    </div>
                  </div>
                  <h3 className="text-xl font-medium">Thanks for subscribing!</h3>
                  <p className="text-foreground/70">
                    You'll start receiving updates on opportunities and resources soon.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
