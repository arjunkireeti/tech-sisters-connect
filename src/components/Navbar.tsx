
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navLinks = [
    { name: 'Mentors', href: '#mentors', icon: Users },
    { name: 'Resources', href: '#resources', icon: BookOpen },
    { name: 'Opportunities', href: '#opportunities', icon: Briefcase },
    { name: 'Community', href: '#community', icon: Heart },
  ];

  // Get initials from user email
  const getUserInitials = () => {
    if (!user?.email) return 'U';
    return user.email.substring(0, 2).toUpperCase();
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled 
          ? 'py-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md' 
          : 'py-4 bg-transparent'
      )}
    >
      <nav className="container-custom flex items-center justify-between">
        {/* Logo */}
        <a 
          href="/" 
          className="flex items-center gap-2 font-medium text-lg"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-techpurple-500 to-techteal-400 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">TS</span>
          </div>
          <span className="hidden sm:inline-block animate-fade-in">TechSistersConnect</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-1.5"
            >
              <link.icon className="w-4 h-4" />
              <span>{link.name}</span>
            </a>
          ))}
        </div>

        {/* CTA Button or User Menu */}
        <div className="hidden md:block">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                asChild
              >
                <Link to="/auth/signin">Sign In</Link>
              </Button>
              <Button 
                className="bg-gradient-to-r from-techpurple-500 to-techteal-500 hover:from-techpurple-600 hover:to-techteal-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                asChild
              >
                <Link to="/auth/signup">Join Now</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2 text-foreground/80 hover:text-foreground transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        )}
      >
        <div className="container-custom py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="py-2 px-4 font-medium text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2 rounded-md hover:bg-muted"
              onClick={() => setIsOpen(false)}
            >
              <link.icon className="w-5 h-5" />
              <span>{link.name}</span>
            </a>
          ))}
          <div className="mt-2 px-4">
            {user ? (
              <div className="space-y-2">
                <div className="flex items-center gap-3 py-2">
                  <Avatar>
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.email}</p>
                  </div>
                </div>
                <Link to="/profile" onClick={() => setIsOpen(false)}>
                  <Button variant="outline" className="w-full justify-start">
                    <UserCircle className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                </Link>
                <Button onClick={() => { signOut(); setIsOpen(false); }} variant="outline" className="w-full justify-start text-destructive">
                  <LogIn className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Button 
                  variant="outline"
                  className="w-full"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/auth/signin">Sign In</Link>
                </Button>
                <Button 
                  className="w-full bg-gradient-to-r from-techpurple-500 to-techteal-500 hover:from-techpurple-600 hover:to-techteal-600 text-white"
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link to="/auth/signup">Join Now</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
