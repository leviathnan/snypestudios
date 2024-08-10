'use client'
import React,{useEffect, useRef} from "react";
import styles from "./style.module.scss";
import Image from "next/image";
import { neue_montreal } from "@/fonts";

export default function Contact() {
  const scrollRef = useRef(null);
  let locomotiveScroll;

  useEffect(() => {
    const initializeScroll = async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      locomotiveScroll = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
      });
    };

    initializeScroll();

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  return (
    <main className={`${styles.main}`} ref={scrollRef}>
      <div className={`${neue_montreal.className} ${styles.introdiv}`}>
        <h1 className={`${styles.intro}`}>Contact</h1>
        <p>This page is for contact component</p>
      </div>
      <Image
        src={`/images/demo-pic03.jpg`}
        alt="image"
        height={1000}
        width={1500}
        className={styles.image}
      />
    </main>
  );
}
