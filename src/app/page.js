'use client';
import React, { useEffect, useState, useRef } from 'react';
import Landing from "../components/landing";
import Projects from '../components/projects';
import Description from "../components/description";
import SlidingGallery from '../components/slidingGallery';
import Preloader from '../components/preloader'
import { AnimatePresence } from 'framer-motion';


export default function Home() {

  const [isLoading, setIsLoading] = useState(true);
  const scrollRef = useRef(null);
  let locomotiveScroll;

  useEffect(() => {
    const initializeScroll = async()=>{
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      locomotiveScroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
      });

      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = 'default'
        window.scrollTo(0,0);
      }, 2000);
    };

    initializeScroll();

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  return (
    <main ref={scrollRef} data-scroll-container>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <Projects />
      <SlidingGallery />
    </main>
  )
}
