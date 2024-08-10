'use client'
import styles from './style.module.scss';
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import Project from './component/project';
import Image from "next/image";
import {motion} from 'framer-motion';
import Rounded from '../../common/roundedButton'
import { neue_montreal } from '@/fonts';

const projects =[
  {
    title: 'Russia',
    src: 'demo-pic01.jpg',
    color: '#000000'
  },
  {
    title: 'Canada',
    src: 'demo-pic02.jpg',
    color: '#8C8C8C'
  },
  {
    title: 'Germany',
    src: 'demo-pic03.jpg',
    color: '#EFE8D3'
  },
  {
    title: 'America',
    src: 'demo-pic04.jpg',
    color: '#706D63'
  }
]
const scaleAnimation = {
  initial: {scale: 0, x:"-50%", y:"-50%"},
  open: {scale: 1, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.76, 0, 0.24, 1]}},
  closed: {scale: 0, x:"-50%", y:"-50%", transition: {duration: 0.4, ease: [0.32, 0, 0.67, 0]}}

}

export default function Home(){

  const [modal, setModal] = useState({active: false, index: 0})
  const { active, index } = modal;
  const container= useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

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

  return (
    <main onMouseMove={(e) => {moveItems(e.clientX, e.clientY)}} className={styles.projects}>
      <div className={styles.body}>
        {
          projects.map( (project, index) => {
            return <Project index={index} title={project.title} manageModal={manageModal} key={index} />
          })
        }
      </div>
      <Rounded>
        <p className={neue_montreal.className}>More work</p>
      </Rounded>
      <>
        <motion.div ref={container} variants={scaleAnimation} initial={"initial"} animate={active? 'open' : 'closed'} className={styles.modalContainer}>
          <div style={{top: index* -100+"%"}} className={styles.modalSlider}>
            {
              projects.map((project, index)=> {
                return <div key={`modal_${index}`} style={{backgroundColor: project.color}} className={styles.modal}>
                  <Image
                    src={`/images/${project.src}`}
                    width ={300}
                    height={0}
                    alt='image'
                  />
                </div>
              })
            }
          </div>
        </motion.div>
        <motion.div ref={cursor} variants={scaleAnimation} initial={"initial"} animate={active? 'open' : 'closed'} className={styles.cursor}></motion.div>
        <motion.div ref={cursorLabel} variants={scaleAnimation} initial={"initial"} animate={active? 'open' : 'closed'} className={styles.cursorLabel}>View</motion.div>
      </>
    </main>
  )
}