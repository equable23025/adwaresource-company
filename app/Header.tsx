"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "./components/images/2568-08-20 16.45.43.jpg";

export default function Header() {
  const [dbConfigured, setDbConfigured] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;
    if (!databaseUrl || databaseUrl === "prisma+postgres://accelerate.prisma-data.net/?api_key=API_KEY") {
      setDbConfigured(false);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full bg-white shadow-md py-4 px-4 md:px-8 transition-all duration-300">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#512E8C] hover:text-[#7F4FC3] transition-colors duration-300">
          <Image src={Logo} alt="Adwaresource Consulting" width={120} height={90} priority className="w-20 md:w-32" />
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/about" className="text-[#222222] hover:text-[#7F4FC3] transition-colors duration-300 font-medium">
            เกี่ยวกับเรา
          </Link>
          <Link href="/service" className="text-[#222222] hover:text-[#7F4FC3] transition-colors duration-300 font-medium">
            บริการของเรา
          </Link>
          <Link href="/blog" className="text-[#222222] hover:text-[#7F4FC3] transition-colors duration-300 font-medium">
            ข้อมูลข่าวสาร
          </Link>
          <Link href="/contact" className="text-[#222222] hover:text-[#7F4FC3] transition-colors duration-300 font-medium">
            ติดต่อเรา
          </Link>
        </div>
       
        {/* Desktop Admin Navigation */}
        {dbConfigured && (
          <div className="hidden lg:flex items-center space-x-4">
            <Link href="/posts" className="text-[#7F4FC3] hover:text-[#512E8C] transition-colors duration-300 font-medium">
              Posts
            </Link>
            <Link href="/posts/new" className="text-[#7F4FC3] hover:text-[#512E8C] transition-colors duration-300 font-medium">
              New Post
            </Link>
            <Link href="/users/new" className="bg-[#512E8C] text-white px-4 py-2 rounded-lg hover:bg-[#7F4FC3] transition-colors duration-300 font-medium">
              New User
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-[#512E8C]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-200 transition-all duration-300">
          <div className="flex flex-col space-y-4 pt-4">
            <Link 
              href="/about" 
              className="text-[#222222] hover:text-[#7F4FC3] transition-colors duration-300 font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              เกี่ยวกับเรา
            </Link>
            <Link 
              href="/service" 
              className="text-[#222222] hover:text-[#7F4FC3] transition-colors duration-300 font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              บริการของเรา
            </Link>
            <Link 
              href="/blog" 
              className="text-[#222222] hover:text-[#7F4FC3] transition-colors duration-300 font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              ข้อมูลข่าวสาร
            </Link>
            <Link 
              href="/contact" 
              className="text-[#222222] hover:text-[#7F4FC3] transition-colors duration-300 font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
              onClick={() => setIsMenuOpen(false)}
            >
              ติดต่อเรา
            </Link>
            
            {/* Mobile Admin Navigation */}
            {dbConfigured && (
              <>
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <Link 
                    href="/posts" 
                    className="text-[#7F4FC3] hover:text-[#512E8C] transition-colors duration-300 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Posts
                  </Link>
                  <Link 
                    href="/posts/new" 
                    className="text-[#7F4FC3] hover:text-[#512E8C] transition-colors duration-300 font-medium px-4 py-2 rounded-lg hover:bg-gray-50 block mt-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    New Post
                  </Link>
                  <Link 
                    href="/users/new" 
                    className="bg-[#512E8C] text-white px-4 py-2 rounded-lg hover:bg-[#7F4FC3] transition-colors duration-300 font-medium mt-2 block text-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    New User
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
