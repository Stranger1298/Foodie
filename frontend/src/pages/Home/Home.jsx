import React, { useState, useEffect } from 'react';
import './Home.css';
import Header from '../../components/Header/Header';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import SearchBar from "../../components/SearchBar/SearchBar";

const Home = () => {
  const [category, setCategory] = useState('All');
 

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const shouldScroll = localStorage.getItem("scrollToMenu");
    if (shouldScroll === "true") {
      const section = document.getElementById("explore-menu");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
      localStorage.removeItem("scrollToMenu");
    }
  }, []);


  
  return (
    <div className="home-page">
      <SearchBar />
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
    </div>
  );
};

export default Home;
