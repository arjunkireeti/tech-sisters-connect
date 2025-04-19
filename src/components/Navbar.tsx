
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Users, BookOpen, Briefcase, Heart, UserCircle, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, profile, loading, signOut } = useAuth();
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    try {
      console.log("Sign out initiated");
      await signOut();
      console.log("Sign out completed");
    } catch (error) {
      console.error('Sign out error:', error);
      toast({
        title: 'Sign Out Failed',
        description: 'An error occurred while signing out. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary">Tech Sisters Connect</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
              Home
            </Link>
            <Link to="/mentors" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
              Mentors
            </Link>
            <Link to="/resources" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
              Resources
            </Link>
            <Link to="/opportunities" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary">
              Opportunities
            </Link>
            
            {user ? (
              <div className="ml-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative rounded-full">
                      <Avatar>
                        <AvatarImage src={profile?.avatar_url || ''} alt={profile?.username || 'User'} />
                        <AvatarFallback>{(profile?.username || 'U').charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{profile?.username || 'User'}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="cursor-pointer w-full flex items-center">
                        <UserCircle className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    
                    {profile?.user_type === 'mentor' && (
                      <DropdownMenuItem asChild>
                        <Link to="/mentor/dashboard" className="cursor-pointer w-full flex items-center">
                          <Briefcase className="mr-2 h-4 w-4" />
                          <span>Mentor Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                      <LogIn className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="ml-4 flex items-center">
                <Link to="/auth/signin">
                  <Button variant="outline" size="sm" className="mr-2">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth/signup">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={cn("md:hidden", isMenuOpen ? "block" : "hidden")}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/mentors"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Mentors
          </Link>
          <Link
            to="/resources"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Resources
          </Link>
          <Link
            to="/opportunities"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
            onClick={() => setIsMenuOpen(false)}
          >
            Opportunities
          </Link>
          
          {user ? (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              
              {profile?.user_type === 'mentor' && (
                <Link
                  to="/mentor/dashboard"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Mentor Dashboard
                </Link>
              )}
              
              <button
                onClick={() => {
                  console.log("Mobile sign out initiated");
                  handleSignOut();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="mt-4 pt-4 border-t border-gray-200 flex flex-col space-y-2">
              <Link
                to="/auth/signin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/auth/signup"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
