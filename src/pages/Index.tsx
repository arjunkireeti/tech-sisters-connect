
import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MentorSection } from '@/components/MentorSection';
import { ResourceSection } from '@/components/ResourceSection';
import { OpportunitySection } from '@/components/OpportunitySection';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>
        <Hero />
        <MentorSection />
        <ResourceSection />
        <OpportunitySection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
