import React, { useState } from 'react';
import { BuildingStorefrontIcon, CurrencyDollarIcon, UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin }) => {
  const [email, setEmail] = useState('customer@example.com');
  const [password, setPassword] = useState('password');

  const handleDemoLogin = (role) => {
    if (role === 'customer') {
      onLogin('customer@example.com', 'password');
    } else if (role === 'owner') {
      onLogin('owner@example.com', 'password');
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <BuildingStorefrontIcon className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">FoodApp</span>
            </div>
            <div className="space-x-2">
                <button onClick={() => handleDemoLogin('customer')} className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors">
                    Demo as Customer
                </button>
                <button onClick={() => handleDemoLogin('owner')} className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm">
                    Demo as Owner
                </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main>
        <div className="relative">
          <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight">
                Your Favorite Food, Delivered Fast
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
                Discover local restaurants, manage your own menu, and enjoy delicious meals. All powered by a secure and scalable backend.
              </p>
              <div className="mt-10 flex justify-center gap-4">
                 <a href="#features" className="inline-block bg-blue-600 text-white font-medium px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition-transform hover:scale-105">
                    Explore Features
                </a>
                <a href="/admin" target="_blank" rel="noopener noreferrer" className="inline-block bg-white text-gray-700 font-medium px-8 py-3 rounded-lg shadow-md border border-gray-200 hover:bg-gray-50 transition-transform hover:scale-105">
                    Visit Admin Panel
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900">Why Choose FoodApp?</h2>
              <p className="mt-4 text-lg text-gray-600">Everything you need in a modern food delivery platform.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <UserGroupIcon className="h-12 w-12 mx-auto text-blue-600" />
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Multiple Roles</h3>
                <p className="mt-2 text-gray-600">Dedicated dashboards for customers, restaurant owners, and administrators.</p>
              </div>
              <div className="text-center p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <BuildingStorefrontIcon className="h-12 w-12 mx-auto text-blue-600" />
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Restaurant Management</h3>
                <p className="mt-2 text-gray-600">Owners can easily create and manage their restaurant profile and menu items.</p>
              </div>
              <div className="text-center p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <CurrencyDollarIcon className="h-12 w-12 mx-auto text-blue-600" />
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Simple Browsing</h3>
                <p className="mt-2 text-gray-600">Customers can browse restaurants and view menus with detailed pricing.</p>
              </div>
              <div className="text-center p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <ShieldCheckIcon className="h-12 w-12 mx-auto text-blue-600" />
                <h3 className="mt-6 text-xl font-semibold text-gray-900">Secure by Design</h3>
                <p className="mt-2 text-gray-600">Built-in authentication and access policies protect user and restaurant data.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
          <p>&copy; {new Date().getFullYear()} FoodApp. All rights reserved. Powered by Manifest.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
