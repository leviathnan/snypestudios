'use client';
import styles from './style.module.scss'
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Nav from './nav'
import { AnimatePresence } from 'framer-motion';
import { usePathname } from "next/navigation";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '../../common/magnetic';
import Rounded from '../../common/roundedButton';
import { neue_montreal } from '@/fonts';

export default function index(){
  const [isActive, setIsActive] = useState(false);
  const header = useRef(null);
  const pathname = usePathname();
  const button = useRef(null);

  useEffect(() => {
    if (isActive) setIsActive(false)
  }, [pathname])

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger)
    gsap.to(button.current, {
      scrollTrigger:{
        trigger: document.documentElement,
        start:0,
        end: window.innerHeight,
        onLeave: ()=>{gsap.to(button.current, {scale:1, duration: 0.25, ease: 'power1.out' })},
        onEnterBack: ()=>{gsap.to(button.current, {scale:0, duration: 0.25, ease:'power1.out'}, setIsActive(false))}
      }
    })
  }, [])
  

  return (
    <>
    <div ref={header} className={`${styles.header} ${neue_montreal.className}`}>
      <div className={styles.logo}>
        <Link href='/' />
        <p className={styles.copyright}>©</p>
        <div className={styles.name}>
          <p className={styles.codeby}>Snype</p>
          <p className={styles.caleb} >Studios</p>
        </div>
      </div>

      <div className={styles.nav}>
        <Magnetic>
          <div className={styles.el}>
            <Link className={styles.link} href='/work'>Work</Link>
            <div className={styles.indicator}></div>
          </div>
        </Magnetic>
        <Magnetic>
          <div className={styles.el}>
            <Link className={styles.link} href='/about'>About</Link>
            <div className={styles.indicator}></div>
          </div>
        </Magnetic>
        <Magnetic>
          <div className={styles.el}>
            <Link className={styles.link} href='/contact'>Contact</Link>
            <div className={styles.indicator}></div>
          </div>
        </Magnetic>
      </div>
    </div>
    <div ref={button} className={`${styles.headerButtonContainer} ${neue_montreal.className}`}>
      <Rounded onClick={()=>{setIsActive(!isActive)}} className={`${styles.button}`}>
        <div className={`${styles.burger} ${isActive ? styles.burgerActive: ""}`}></div>
      </Rounded>
    </div>

    <AnimatePresence mode="wait">
      {isActive && <Nav className={`${neue_montreal.className}`} />}
    </AnimatePresence>
    </>
  )
}