'use client'
import styles from './page.module.scss'
import Image from "next/image";
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {motion} from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { slideUp } from './anim';
import { neue_montreal } from '@/fonts';


export default function Index() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useGSAP(()=>{
    gsap.registerPlugin(ScrollTrigger);
    requestAnimationFrame(animation);

    gsap.to(slider.current,{
      scrollTrigger:{
        trigger: document.documentElement,
        start:0,
        end: window.innerHeight,
        scrub: 0.25,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-500px"
    })
  },[])

  const animation=()=>{
    if(xPercent <= -100){
      xPercent = 0;
    }
    if(xPercent > 0){
      xPercent = -100;
    }
  }
  useGSAP(()=>{
    gsap.set(firstText.current, {xPercent: xPercent})
    gsap.set(secondText.current, {xPercent: xPercent})
    xPercent += 0.1 * direction;
    requestAnimationFrame(animation);
  })

  return (
    <motion.main variants={slideUp} initial='initial' animate='enter' className={`${styles.main} ${neue_montreal.className}`}>
      <Image 
        fill={true}
        src={"../../public/Images/snype_pic02.PNG"}
        alt="background"
      />
      <div className={styles.sliderContainer}>
        <div ref={slider} className={`${styles.slider}`}>
          <p ref={firstText}>Shamin Jayed -</p>
          <p ref={secondText}>Shamin Jayed -</p>
        </div>
      </div>
      <div data-scroll data-scroll-speed={0.1} className={styles.description}>
        <svg width='9' height='9' viewBox='0 0 9 9' fill='none' xmlns='https://www.w3.org/2000/svg'>
          <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
        </svg>
        <p>Freelance</p>
        <p>Video Editor</p>
      </div>
    </motion.main>
  );
}
