
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Footer } from '@/components/Footer';

const Mentors = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Our Mentors</h1>
        <p className="mb-8 text-lg">
          Connect with experienced professionals in the tech industry who are dedicated to helping women succeed.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Placeholder for mentor cards - will be populated from database in future */}
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="border rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                <div>
                  <h3 className="font-medium">Mentor Name</h3>
                  <p className="text-sm text-gray-500">Senior Developer</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">Specializes in frontend development, React, and UI/UX design.</p>
              <button className="text-primary hover:underline">View Profile</button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Mentors;
