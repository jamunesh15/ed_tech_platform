


import React, { useEffect, useState, useRef } from 'react';
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { MdMenu, MdClose } from "react-icons/md";
import { IoIosArrowDropdown, IoIosArrowDropup } from "react-icons/io";
import Profiledropdown from '../auth/Profiledropdown';
import { apiconnector } from '../../Services/apiconnector';
import { categories } from '../../Services/apis';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const location = useLocation();
  const navigate = useNavigate();

  const [sublinks, setSublinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  
  const catalogRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Close mobile menu and catalog when clicking outside
  useOnClickOutside(mobileMenuRef, () => {
    console.log('Clicked outside mobile menu, closing...');
    setIsMobileMenuOpen(false);
    setIsCatalogOpen(false);
  });
  useOnClickOutside(catalogRef, () => {
    console.log('Clicked outside catalog, closing...');
    setIsCatalogOpen(false);
  });

  // Close mobile menu and catalog when route changes
  useEffect(() => {
    console.log('Route changed, closing menus...');
    setIsMobileMenuOpen(false);
    setIsCatalogOpen(false);
  }, [location.pathname]);

  // Close mobile menu on window resize above 1024px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        console.log('Window resized above 1024px, closing menus...');
        setIsMobileMenuOpen(false);
        setIsCatalogOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const result = await apiconnector("GET", categories.CATEGORIES_API);
      setSublinks(result.data.data);
    } catch (error) {
      console.error("Error while fetching categories:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const toggleMobileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggling mobile menu, current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(prev => !prev);
    if (!isMobileMenuOpen) setIsCatalogOpen(false); // Close catalog when opening menu
  };

  const closeMobileMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Closing mobile menu, current state:', isMobileMenuOpen);
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleCatalog = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Toggling catalog, current state:', isCatalogOpen);
    setIsCatalogOpen(prev => !prev);
  };

  const handleCatalogNavigation = (subLink, e) => {
    e.preventDefault();
    e.stopPropagation();
    const catalogPath = `/catalog/${subLink.name.split(" ").join("-").toLowerCase()}`;
    console.log('Navigating to:', catalogPath);
    setIsMobileMenuOpen(false);
    setIsCatalogOpen(false);
    navigate(catalogPath);
  };

  return (
    <nav className='sticky top-0 z-50 w-full bg-gradient-to-r from-richblack-900 via-richblack-800 to-richblack-900 backdrop-blur-xl border-b border-richblack-600 shadow-2xl'>
      <div className='w-full max-w-maxContent mx-auto'>
        <div className='flex items-center justify-between px-4 py-4 lg:px-8'>
          
          {/* Logo */}
          <Link to="/" className='flex-shrink-0 group'>
            <img 
              className='h-9 w-auto sm:h-11 transition-all duration-300 group-hover:scale-110 drop-shadow-lg' 
              src={logo} 
              alt="StudyNotion" 
            />
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden lg:flex items-center space-x-1'>
            {NavbarLinks.map((link, index) => (
              <div key={index} className='relative'>
                {link.title === "Catalog" ? (
                  <div 
                    className='relative'
                    ref={catalogRef}
                  >
                    <button 
                      className={`flex items-center gap-2 px-4 py-2 text-richblack-25 font-medium rounded-lg transition-all duration-300 group relative overflow-hidden ${
                        isCatalogOpen ? 'bg-richblack-700 text-yellow-50 shadow-lg' : 'hover:bg-richblack-700/50 hover:text-yellow-50'
                      }`}
                      onClick={toggleCatalog}
                    >
                      <span className='relative z-10'>{link.title}</span>
                      <IoIosArrowDropdown className={`text-lg transition-all duration-300 relative z-10 ${
                        isCatalogOpen ? 'rotate-180 text-yellow-50' : 'group-hover:text-yellow-50'
                      }`} />
                      <div className='absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </button>

                    <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-3 w-80 bg-gradient-to-br from-richblack-800 via-richblack-700 to-richblack-800 rounded-xl shadow-2xl border border-richblack-600 transition-all duration-300 ${
                      isCatalogOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'
                    }`}>
                      <div className='absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-richblack-800 border-l border-t border-richblack-600 rotate-45'></div>
                      
                      <div className='p-2'>
                        <div className='bg-richblack-900/50 rounded-lg p-2 mb-2'>
                          <h3 className='text-yellow-50 font-semibold text-sm px-2 py-1'>Course Categories</h3>
                        </div>
                        
                        <div className='max-h-80 overflow-y-auto custom-scrollbar'>
                          {loading ? (
                            <div className='flex items-center justify-center py-8'>
                              <div className='relative'>
                                <div className='w-8 h-8 border-4 border-yellow-50/30 border-t-yellow-50 rounded-full animate-spin'></div>
                                <div className='absolute inset-0 w-8 h-8 border-4 border-transparent border-t-blue-400 rounded-full animate-spin animate-reverse'></div>
                              </div>
                              <span className='ml-3 text-richblack-200 text-sm'>Loading categories...</span>
                            </div>
                          ) : sublinks.length > 0 ? (
                            <div className='space-y-1'>
                              {sublinks.map((subLink, i) => (
                                <button
                                  key={i}
                                  onClick={(e) => handleCatalogNavigation(subLink, e)}
                                  className='group flex items-center w-full px-3 py-2.5 text-richblack-100 hover:bg-gradient-to-r hover:from-yellow-500/10 hover:to-blue-500/10 hover:text-yellow-50 rounded-lg transition-all duration-200 text-sm relative overflow-hidden text-left'
                                >
                                  <span className='relative z-10 flex-1'>{subLink.name}</span>
                                  <div className='w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 relative z-10'></div>
                                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-yellow-500/5 to-blue-500/5 translate-x-full group-hover:translate-x-0 transition-transform duration-300'></div>
                                </button>
                              ))}
                            </div>
                          ) : (
                            <div className='px-3 py-8 text-center'>
                              <div className='text-richblack-400 text-sm'>No categories found</div>
                              <div className='text-richblack-500 text-xs mt-1'>Check back later</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link 
                    to={link?.path} 
                    className={`relative px-4 py-2 text-richblack-25 font-medium rounded-lg transition-all duration-300 group overflow-hidden ${
                      location.pathname === link?.path 
                        ? 'text-yellow-50 bg-richblack-700 shadow-lg' 
                        : 'hover:bg-richblack-700/50 hover:text-yellow-50'
                    }`}
                  >
                    <span className='relative z-10'>{link.title}</span>
                    {location.pathname === link?.path && (
                      <div className='absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full'></div>
                    )}
                    <div className='absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className='hidden lg:flex items-center space-x-6'>
            <div className='flex items-center space-x-4'>
              {token === null ? (
                <>
                  <Link to="/login">
                    <button className='px-5 py-2 text-richblack-100 bg-transparent border border-richblack-600 rounded-lg hover:bg-richblack-700 hover:border-richblack-500 hover:text-yellow-50 transition-all duration-300 font-medium relative overflow-hidden group btn-enhanced'>
                      <span className='relative z-10'>Log In</span>
                      <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button className='px-5 py-2 text-richblack-900 bg-gradient-to-r from-yellow-50 to-yellow-500 rounded-lg hover:from-yellow-100 hover:to-yellow-150 transition-all duration-300 font-medium shadow-lg hover:shadow-yellow-25 transform hover:scale-105 relative overflow-hidden group btn-enhanced'>
                      <span className='relative z-10'>Sign Up</span>
                      <div className='absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </button>
                  </Link>
                </>
              ) : (
                <div className='relative profile-container'>
                  <div className='p-1.5 bg-richblack-700/40 rounded-lg border border-richblack-600 hover:border-yellow-500/50 transition-all duration-300'>
                    <Profiledropdown />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle Buttons */}
          <div className='lg:hidden flex items-center space-x-3'>
            {!isMobileMenuOpen ? (
              <button
                onClick={toggleMobileMenu}
                className='relative flex items-center justify-center w-10 h-10 text-richblack-100 transition-all duration-300 group overflow-hidden border bg-richblack-700/40 hover:bg-richblack-600/60 border-richblack-600 hover:border-yellow-500/50 rounded-lg profile-container'
                aria-label="Open mobile menu"
              >
                <div className='relative z-10'>
                  <MdMenu className="text-lg transition-transform duration-300 group-hover:scale-110" />
                </div>
                <div className='absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
              </button>
            ) : (
              <div className='relative z-50'> {/* Increased z-index to ensure clickability */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('Close button clicked');
                    closeMobileMenu(e);
                  }}
                  className='relative flex items-center justify-center w-10 h-10 text-yellow-50 transition-all duration-300 group overflow-hidden border bg-yellow-500/20 border-yellow-500/50 rounded-lg profile-container'
                  aria-label="Close mobile menu"
                >
                  <div className='relative z-10'>
                    <MdClose className="text-lg transition-transform duration-300 rotate-90" />
                  </div>
                  <div className='absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          ref={mobileMenuRef}
          className={`lg:hidden bg-gradient-to-br from-richblack-800 via-richblack-700 to-richblack-800 border-t border-richblack-600 transition-all duration-500 ease-in-out backdrop-blur-xl ${
            isMobileMenuOpen ? 'max-h-screen opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-4 overflow-hidden'
          }`}
        >
          <div className='px-6 py-8 space-y-6'>
            <div className='space-y-2'>
              {NavbarLinks.map((link, index) => (
                <div key={index} className='group mobile-menu-item'>
                  {link.title === "Catalog" ? (
                    <div>
                      <button 
                        className='flex items-center justify-between w-full p-4 text-richblack-25 font-medium rounded-xl hover:bg-richblack-600/50 transition-all duration-300 group'
                        onClick={toggleCatalog}
                      >
                        <span className='text-lg'>{link.title}</span>
                        <div className='flex items-center space-x-2'>
                          <div className='w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                          {isCatalogOpen ? (
                            <IoIosArrowDropup className='text-lg text-yellow-50 transition-transform duration-300' />
                          ) : (
                            <IoIosArrowDropdown className='text-lg group-hover:text-yellow-50 transition-colors duration-300' />
                          )}
                        </div>
                      </button>
                      
                      <div className={`transition-all duration-400 ease-in-out ${
                        isCatalogOpen && isMobileMenuOpen ? 'max-h-72 opacity-100 mt-2' : 'max-h-0 opacity-0 overflow-hidden'
                      }`}>
                        <div ref={catalogRef} className='bg-richblack-900/50 rounded-xl p-4 ml-4 border border-richblack-600'>
                          <div className='max-h-48 overflow-y-auto custom-scrollbar space-y-2'>
                            {loading ? (
                              <div className='flex items-center justify-center py-6'>
                                <div className='relative'>
                                  <div className='w-6 h-6 border-3 border-yellow-50/30 border-t-yellow-50 rounded-full animate-spin'></div>
                                </div>
                                <span className='ml-3 text-richblack-200 text-sm'>Loading...</span>
                              </div>
                            ) : sublinks.length > 0 ? (
                              sublinks.map((subLink, i) => (
                                <button
                                  key={i}
                                  onClick={(e) => handleCatalogNavigation(subLink, e)}
                                  className='block w-full text-left p-3 text-richblack-200 hover:text-yellow-50 hover:bg-richblack-700/50 rounded-lg transition-all duration-200 group'
                                >
                                  <div className='flex items-center justify-between'>
                                    <span>{subLink.name}</span>
                                    <div className='w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200'></div>
                                  </div>
                                </button>
                              ))
                            ) : (
                              <div className='py-6 text-center'>
                                <div className='text-richblack-400 text-sm'>No categories found</div>
                                <div className='text-richblack-500 text-xs mt-1'>Check back later</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Link 
                      to={link?.path} 
                      className={`block p-4 text-lg font-medium rounded-xl transition-all duration-300 group relative overflow-hidden ${
                        location.pathname === link?.path 
                          ? 'text-yellow-50 bg-richblack-600/50 shadow-lg' 
                          : 'text-richblack-25 hover:bg-richblack-600/50 hover:text-yellow-50'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <div className='flex items-center justify-between relative z-10'>
                        <span>{link.title}</span>
                        {location.pathname === link?.path && (
                          <div className='w-2 h-2 bg-yellow-400 rounded-full animate-pulse'></div>
                        )}
                      </div>
                      <div className='absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {token !== null && (
              <div className='pt-6 border-t border-richblack-600'>
                <div className='flex items-center justify-center'>
                  <div className='relative profile-container'>
                    <div className='p-1.5 bg-richblack-700/40 rounded-lg border border-richblack-600 hover:border-yellow-500/50 transition-all duration-300'>
                      <Profiledropdown />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {token === null && (
        <div className='lg:hidden bg-richblack-900 border-b border-richblack-700 py-3 px-4'>
          <div className='flex items-center justify-center gap-4 max-w-sm mx-auto'>
            <Link to="/login" className='flex-1'>
              <button className='w-full px-4 py-2.5 text-sm font-medium text-richblack-100 bg-transparent border border-richblack-600 rounded-lg hover:bg-richblack-700 hover:border-richblack-500 hover:text-yellow-50 transition-all duration-300'>
                Log In
              </button>
            </Link>
            <Link to="/signup" className='flex-1'>
              <button className='w-full px-4 py-2.5 text-sm font-medium text-richblack-900 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-md'>
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
