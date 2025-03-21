
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Resources = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Learning Resources</h1>
        <p className="mb-8 text-lg">
          Access curated resources to help you advance your tech career and build valuable skills.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for resource cards */}
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="h-40 bg-gray-200 rounded mb-4"></div>
              <h3 className="font-medium text-lg mb-2">Resource Title</h3>
              <p className="text-gray-700 mb-4">A brief description of what this resource covers and how it can help.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">Category</span>
                <button className="text-primary hover:underline">Access Resource</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Resources;
