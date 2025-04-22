import React from 'react';
import Header from './components/Header';
import Products from './components/Products';
import { redirect } from 'next/navigation';





const HomePage = async () => {
  redirect('/auth/login')
  const items = [
    { title: 'Item 1', description: 'Description for item 1', image: 'https://via.placeholder.com/140', price: '50',  isSold: false },
    { title: 'Item 2', description: 'Description for item 2', image: 'https://via.placeholder.com/140', price: '75',  isSold: false },
    { title: 'Item 3', description: 'Description for item 3', image: 'https://via.placeholder.com/140', price: '100', isSold: false },
    { title: 'Item 3', description: 'Description for item 3', image: 'https://via.placeholder.com/140', price: '100', isSold: false },
    { title: 'Item 3', description: 'Description for item 3', image: 'https://via.placeholder.com/140', price: '100', isSold: false },
    { title: 'Item 3', description: 'Description for item 3', image: 'https://via.placeholder.com/140', price: '100', isSold: false },
    { title: 'Item 3', description: 'Description for item 3', image: 'https://via.placeholder.com/140', price: '100', isSold: false },
    { title: 'Item 3', description: 'Description for item 3', image: 'https://via.placeholder.com/140', price: '100', isSold: false },
    { title: 'Item 3', description: 'Description for item 3', image: 'https://via.placeholder.com/140', price: '100', isSold: false },
    { title: 'Item 3', description: 'Description for item 3', image: 'https://via.placeholder.com/140', price: '100', isSold: false },
    { title: 'Item 3', description: 'Description for item 3', image: 'https://via.placeholder.com/140', price: '100', isSold: false },
    { title: 'Item 3', description: 'Description for item 3', image: 'https://via.placeholder.com/140', price: '100', isSold: false },
    { title: 'Item 3', description: 'Description for item 3', image: 'https://via.placeholder.com/140', price: '100', isSold: false },
    { title: 'Item 3', description: 'Description for item 3', image: 'https://via.placeholder.com/140', price: '100', isSold: false },
    { title: 'Item 3', description: 'Description for item 3', image: 'https://via.placeholder.com/140', price: '100', isSold: false },
    { title: 'Item 3', description: 'Description for item 3', image: 'https://via.placeholder.com/140', price: '100', isSold: false },
  ];
  return (
    <div className="bg-white min-h-screen">
      <Header/>
      <div className=" px-8 mt-2">
        <Products items={items}/>
      </div>

      
    </div>
  );
};

export default HomePage;