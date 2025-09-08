import React from 'react';
import Navbar from './Navbar';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Navbar />
      <h1 className="text-4xl font-bold mt-10">Welcome to Our Landing Page</h1>
      <p className="mt-4 text-lg text-center max-w-md">
        This is a brief description of our application. We aim to provide the best services to our users. Explore our features and get started today!
      </p>
    </div>
  );
};

export default LandingPage;