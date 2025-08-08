

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { apiconnector } from '../Services/apiconnector';
import { categories } from '../Services/apis';
import { getCatalogPagedata } from '../Services/operations/PageandComponents';
import Courseslider from '../coponents/catalog/Courseslider';
import Course_cata_card from '../coponents/catalog/Course_cata_card';
import Footer from '../coponents/Footer';
import Reviewandratingslider from '../coponents/homecompo/Reviewandratingslider';

const Catalog = () => {
  const navigate = useNavigate();
  const { catalogName } = useParams();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [categoryId, setCategoryId] = useState('');
  const [catalogPageData, setCatalogPageData] = useState({
    selectedCategory: null,
    differentCategory: null,
    mostSellingCourses: [],
  });

  const getAllCategories = async () => {
    try {
      const response = await apiconnector('GET', categories.CATEGORIES_API);
      const category_id = response?.data?.data?.find(
        (ct) => ct.name.split(' ').join('-').toLowerCase() === catalogName
      )?._id;
      setCategoryId(category_id || '');
    } catch (error) {
      console.error('Error fetching catalog page data:', error);
    }
  };

  useEffect(() => {
    getAllCategories();
  }, [catalogName]);

  useEffect(() => {
    const getCategoriesDetails = async () => {
      try {
        if (!categoryId) return;
        setLoading(true);
        const res = await getCatalogPagedata(categoryId);
        setCatalogPageData(res || {
          selectedCategory: null,
          differentCategory: null,
          mostSellingCourses: [],
        });
      } catch (error) {
        console.error('Error fetching course categories:', error);
      } finally {
        setLoading(false);
      }
    };
    getCategoriesDetails();
  }, [categoryId]);

  return (
    <div className="min-h-screen w-full bg-richblack-900 text-white">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-pulse text-xl text-gray-100">Loading...</div>
        </div>
      ) : (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-xl mb-12 shadow-[0_4px_20px_rgba(14,165,233,0.2)]">
              <div className="max-w-7xl mx-auto">
                <nav className="flex items-center gap-2 text-sm text-gray-400 mb-6">
                  <span
                    className="hover:text-yellow-400 cursor-pointer transition-colors duration-200"
                    onClick={() => navigate('/')}
                  >
                    Home
                  </span>
                  <span className="text-gray-400">/</span>
                  <span
                    className="hover:text-yellow-400 cursor-pointer transition-colors duration-200"
                    onClick={() => navigate('/catalog')}
                  >
                    Catalog
                  </span>
                  <span className="text-gray-400">/</span>
                  <span className="text-yellow-400 font-medium capitalize">
                    {catalogPageData?.selectedCategory?.name?.toLowerCase() || catalogName}
                  </span>
                </nav>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-100 mb-4 tracking-tight">
                  {catalogPageData?.selectedCategory?.name || 'Category'}
                </h1>
                <p className="text-gray-400 max-w-3xl text-base sm:text-lg leading-relaxed">
                  {catalogPageData?.selectedCategory?.description || 'Explore courses in this category.'}
                </p>
              </div>
            </div>

            {/* Courses To Get You Started */}
            <div className="mb-16">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 tracking-tight">
                  Courses to Get You Started
                </h2>
               
              </div>
              <div className="rounded-xl transition-all duration-200">
                <Courseslider
                  courses={catalogPageData?.selectedCategory?.courses || []}
                  heading=""
                />
              </div>
            </div>

            {/* Top Courses Section */}
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-8 tracking-tight">
                Top Courses in {catalogPageData?.selectedCategory?.name || 'Category'}
              </h2>
              <div className="rounded-xl transition-all duration-200">
                <Courseslider
                  courses={catalogPageData?.differentCategory?.courses || []}
                  heading=""
                />
              </div>
            </div>

            {/* Frequently Bought Section */}
            <div className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-100 mb-8 tracking-tight">
                Frequently Bought Together
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catalogPageData?.mostSellingCourses?.length > 0 ? (
                  catalogPageData.mostSellingCourses.map((course, index) => (
                    <div
                      key={index}
                      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-[0_0_15px_rgba(14,165,233,0.3)] transition-all duration-200"
                    >
                      <Course_cata_card course={course} />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center text-gray-400">
                    No courses available.
                  </div>
                )}
              </div>
            </div>
          </div>
  
  <div className='  ' >
   <Reviewandratingslider/>
  </div>
          <div className="border-t border-gray-700">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default Catalog;