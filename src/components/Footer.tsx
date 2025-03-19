
import { Link } from 'react-router-dom';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Facebook, Twitter, Instagram, Linkedin, Github, Heart } from 'lucide-react';

const footerLinks = [
  {
    title: 'Platform',
    links: [
      { name: 'Home', href: '/' },
      { name: 'About Us', href: '/about' },
      { name: 'Testimonials', href: '/testimonials' },
      { name: 'Careers', href: '/careers' },
      { name: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Blog', href: '/blog' },
      { name: 'Tutorials', href: '/tutorials' },
      { name: 'Events', href: '/events' },
      { name: 'Podcast', href: '/podcast' },
      { name: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Community',
    links: [
      { name: 'Discord', href: '#' },
      { name: 'Forums', href: '#' },
      { name: 'Volunteer', href: '#' },
      { name: 'Partnerships', href: '#' },
      { name: 'Sponsors', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Terms', href: '/terms' },
      { name: 'Privacy', href: '/privacy' },
      { name: 'Cookies', href: '/cookies' },
      { name: 'Licenses', href: '/licenses' },
    ],
  },
];

const socialLinks = [
  { name: 'Twitter', href: '#', icon: Twitter },
  { name: 'LinkedIn', href: '#', icon: Linkedin },
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'GitHub', href: '#', icon: Github },
];

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t border-border/20">
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 space-y-6">
            <Link 
              to="/" 
              className="flex items-center gap-2 font-medium text-lg"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-techpurple-500 to-techteal-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">TS</span>
              </div>
              <span>TechSistersConnect</span>
            </Link>
            <p className="text-foreground/70 max-w-md">
              Empowering women in technology through mentorship, resources, and community. Join us in creating a more diverse and inclusive tech industry.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-foreground/60 hover:text-foreground transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="font-medium text-foreground mb-4">{group.title}</h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-foreground/60 hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left text-foreground/60 text-sm">
            © {new Date().getFullYear()} TechSistersConnect. All rights reserved.
          </div>
          <div className="flex items-center text-sm text-foreground/60">
            <span>Made with</span>
            <Heart className="h-4 w-4 mx-1 text-red-500" />
            <span>for the tech community</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
