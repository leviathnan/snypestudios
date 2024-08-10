"use client";
import React, { useEffect, useRef } from "react";
import styles from "./style.module.scss";
import Projects from './projects'
import { motion, useTransform, useScroll } from "framer-motion";
import { neue_montreal } from "@/fonts";

export default function Work() {
  const mainContainer = useRef(null);
  const { scrollYProgress } = useScroll({
    target: mainContainer,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.8], [50, 0]);

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
    <main ref={[scrollRef, mainContainer]} className={styles.main}>
      <section>
        <div className={`${styles.headContainer} ${neue_montreal.className}`}>
          <h1>
            Making Next Level <br></br>High Ass Edits
          </h1>
        </div>
      </section>
      <Projects />
      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
    </main>
  );
}
