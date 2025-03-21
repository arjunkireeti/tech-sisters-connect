
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Opportunities = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Career Opportunities</h1>
        <p className="mb-8 text-lg">
          Find the latest job openings, internships, and career advancement opportunities in tech.
        </p>

        <div className="space-y-6">
          {/* Placeholder for opportunity listings */}
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-lg">Job Position Title</h3>
                  <p className="text-gray-500">Company Name</p>
                </div>
                <span className="text-sm bg-gray-100 px-2 py-1 rounded">Full-time</span>
              </div>
              <p className="text-gray-700 mb-4">A brief description of the role, responsibilities, and requirements.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Posted 2 days ago</span>
                <button className="text-primary hover:underline">Apply Now</button>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Opportunities;
