'use client'
import styles from './style.module.scss';
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import Project from './component/project';
import Image from "next/image";
import Rounded from '@/common/roundedButton'
import { neue_montreal } from '@/fonts';
import { motion, useTransform, useScroll } from "framer-motion";

const projects = [
  {
    title: "America",
    src: "https://utfs.io/f/b0734153-870a-4622-977a-2ef2f9796638-ta6ahx.jpg",
    location: "Mars",
    services: "Editing",
    Year: "2024",
    color: "#000000",
  },
  {
    title: "Russia",
    src: "https://utfs.io/f/d297518b-4911-4a6d-bca3-aaf6a20c095e-ta6ahu.jpg",
    location: "Jupiter",
    services: "Design",
    Year: "2024",
    color: "#8C8C8C",
  },
  {
    title: "Germany",
    src: "https://utfs.io/f/b3bb4377-7ba6-4aad-871c-1d63550398a7-ta6ahv.jpg",
    location: "Mars",
    services: "Development",
    Year: "2024",
    color: "#EFE8D3",
  },
  {
    title: "Poland",
    src: "https://utfs.io/f/ee8372e1-589a-4a40-9680-451a68f1b164-ta6ahw.jpg",
    location: "Mars",
    services: "Design",
    Year: "2023",
    color: "#706D63",
  },
  {
    title: "Italy",
    src: "https://utfs.io/f/b0734153-870a-4622-977a-2ef2f9796638-ta6ahx.jpg",
    location: "Mars",
    services: "Editing",
    Year: "2024",
    color: "#000000",
  },
  {
    title: "Ireland",
    src: "https://utfs.io/f/4ebc4a65-c677-433e-b857-dfea4336b91b-ta6ahy.jpg",
    location: "Jupiter",
    services: "Development",
    Year: "2024",
    color: "#8C8C8C",
  },
  {
    title: "Canada",
    src: "https://utfs.io/f/a30c6c55-f35f-4f02-aa71-1dda9a4535d6-ta6ahz.jpg",
    location: "Mars",
    services: "Design",
    Year: "2024",
    color: "#EFE8D3",
  },
  {
    title: "Indian",
    src: "https://utfs.io/f/2ef3b3e6-8e41-4aa0-a5a7-2e2abfafa2e3-ta6ai0.jpg",
    location: "Mars",
    services: "Editing",
    Year: "2023",
    color: "#706D63",
  },
];
const scaleAnimation = {
  initial: {scale: 0, x:"-50%", y:"-50%"},
  open: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
  closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}

}

export default function Home(){
  const [filter, setFilter] = useState("all");
  const [modal, setModal] = useState({active: false, index: 0})
  const { active, index } = modal;
  const container= useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  const handleFilter = (services) => {
    setFilter(services);
  };

  let MoveContainerX = useRef(null);
  let MoveContainerY = useRef(null);
  let MoveCursorX = useRef(null);
  let MoveCursorY = useRef(null);
  let MoveCursorLabelX = useRef(null);
  let MoveCursorLabelY = useRef(null);

  useGSAP(()=>{
    MoveContainerX.current = gsap.quickTo(container.current, "left", {duration:0.8, ease:"power3"})
    MoveContainerY.current = gsap.quickTo(container.current, "top", {duration:0.8, ease:"power3"})

    MoveCursorX.current = gsap.quickTo(cursor.current, "left", {duration:0.5, ease:"power3"})
    MoveCursorY.current = gsap.quickTo(cursor.current, "top", {duration:0.5, ease:"power3"})

    MoveCursorLabelX.current = gsap.quickTo(cursorLabel.current, "left", {duration:0.45, ease:"power3"})
    MoveCursorLabelY.current = gsap.quickTo(cursorLabel.current, "top", {duration:0.45, ease:"power3"})

  }, [])

  const moveItems = (x, y) => {
      MoveContainerX.current(x);
      MoveContainerY.current(y);
      MoveCursorX.current(x);
      MoveCursorY.current(y);
      MoveCursorLabelX.current(x);
      MoveCursorLabelY.current(y);
  }
  const manageModal = (active, index, x, y)=>{
    moveItems(x,y)
    setModal({active, index})
  }

  const mainContainer = useRef(null);
  const { scrollYProgress } = useScroll({
    target: mainContainer,
    offset: ["start end", "end start"],
  });

  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <main
      onMouseMove={(e) => {
        moveItems(e.clientX, e.clientY);
      }}
      className={styles.projects}
    >
      <div className={`${styles.buttonContainer} ${neue_montreal.className}`}>
        <Rounded
          onClick={() => handleFilter("Editing")}
        >
          Edits
        </Rounded>
        <Rounded
          onClick={() => handleFilter("Niggafication")}
        >
          Nigga
        </Rounded>
        <Rounded
          onClick={() => handleFilter("Whiggafy")}
        >
          Whigga
        </Rounded>
        <Rounded
          onClick={() => handleFilter("all")}
        >
          All
        </Rounded>
      </div>
      <motion.div
        className={styles.body}
        ref={[mainContainer]}
        data-scroll-container
      >
        {projects
          .filter((project) => filter === "all" || project.services === filter)
          .map((project, index) => {
            return (
              <Project
                index={index}
                title={project.title}
                services={project.services}
                location={project.location}
                Year={project.Year}
                manageModal={manageModal}
                key={index}
              />
            );
          })}
      </motion.div>
      <Rounded>
        <p className={neue_montreal.className}>More work</p>
      </Rounded>
      <motion.div style={{ height }} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>
      <>
        <motion.div
          ref={container}
          variants={scaleAnimation}
          initial={"initial"}
          animate={active ? "open" : "closed"}
          className={styles.modalContainer}
        >
          <div
            style={{ top: index * -100 + "%" }}
            className={styles.modalSlider}
          >
            {projects.map((project, index) => {
              return (
                <div
                  key={`modal_${index}`}
                  style={{ backgroundColor: project.color }}
                  className={styles.modal}
                >
                  <Image
                    src={`${project.src}`}
                    width={300}
                    height={0}
                    alt="image"
                  />
                </div>
              );
            })}
          </div>
        </motion.div>
        <motion.div
          ref={cursor}
          variants={scaleAnimation}
          initial={"initial"}
          animate={active ? "open" : "closed"}
          className={styles.cursor}
        ></motion.div>
        <motion.div
          ref={cursorLabel}
          variants={scaleAnimation}
          initial={"initial"}
          animate={active ? "open" : "closed"}
          className={styles.cursorLabel}
        >
          View
        </motion.div>
      </>
    </main>
  );
}