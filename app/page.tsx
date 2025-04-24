import React from 'react';
import Header from './components/Header';
import { redirect } from 'next/navigation';





const HomePage = async () => {
  redirect('/auth/login')
  return (
    <div className="bg-white min-h-screen">
      <Header/>
      <div className=" px-8 mt-2">
        main page 
      </div>

      
    </div>
  );
};

export default HomePage;