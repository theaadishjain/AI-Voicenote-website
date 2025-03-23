'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Settings } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white shadow-md sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="text-2xl font-bold">
            AI Weather Voice
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="/" isActive={isActive('/')}>
              Home
            </NavLink>
            <NavLink href="/about" isActive={isActive('/about')}>
              About
            </NavLink>
            <NavLink href="/settings" isActive={isActive('/settings')}>
              <Settings size={18} className="mr-1" />
              Settings
            </NavLink>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 animate-fadeIn">
            <div className="flex flex-col space-y-4 pb-4">
              <MobileNavLink href="/" isActive={isActive('/')} onClick={toggleMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/about" isActive={isActive('/about')} onClick={toggleMenu}>
                About
              </MobileNavLink>
              <MobileNavLink href="/settings" isActive={isActive('/settings')} onClick={toggleMenu}>
                <Settings size={18} className="mr-1" />
                Settings
              </MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}

const NavLink = ({ href, children, isActive }: NavLinkProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center transition-colors duration-200 hover:text-blue-300 ${
        isActive ? 'text-blue-300 font-medium' : ''
      }`}
    >
      {children}
    </Link>
  );
};

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({ href, children, isActive, onClick }: MobileNavLinkProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center text-lg py-2 px-4 rounded-md transition-colors duration-200 hover:bg-blue-800 ${
        isActive ? 'bg-blue-800 font-medium' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default Navbar; 