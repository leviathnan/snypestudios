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
    src: "demo-pic01.jpg",
    location: "Mars",
    services: "Editing",
    Year: "2024",
    color: "#000000",
  },
  {
    title: "Russia",
    src: "demo-pic02.jpg",
    location: "Jupiter",
    services: "Design",
    Year: "2024",
    color: "#8C8C8C",
  },
  {
    title: "Germany",
    src: "demo-pic03.jpg",
    location: "Mars",
    services: "Development",
    Year: "2024",
    color: "#EFE8D3",
  },
  {
    title: "Poland",
    src: "demo-pic04.jpg",
    location: "Mars",
    services: "Design",
    Year: "2023",
    color: "#706D63",
  },
  {
    title: "Italy",
    src: "demo-pic01.jpg",
    location: "Mars",
    services: "Editing",
    Year: "2024",
    color: "#000000",
  },
  {
    title: "Ireland",
    src: "demo-pic02.jpg",
    location: "Jupiter",
    services: "Development",
    Year: "2024",
    color: "#8C8C8C",
  },
  {
    title: "Canada",
    src: "demo-pic03.jpg",
    location: "Mars",
    services: "Design",
    Year: "2024",
    color: "#EFE8D3",
  },
  {
    title: "Indian",
    src: "demo-pic04.jpg",
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
                    src={`/images/${project.src}`}
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