import {useRef} from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import styles from './style.module.scss'
import Image from 'next/image'

const slider01= [
  {
    color: '#e3e5e7',
    src: 'demo-pic01.jpg'
  },
  {
    color: '#d6d7dc',
    src: 'demo-pic02.jpg'
  },
  {
    color: '#e3e3e3',
    src: 'demo-pic03.jpg'
  },
  {
    color: '#21242b',
    src: 'demo-pic04.jpg'
  },
]

const slider02= [
  {
    color: '#d4e3ec',
    src: 'demo-pic05.jpg'
  },
  {
    color: '#e5e0e1',
    src: 'demo-pic06.jpg'
  },
  {
    color: '#d7d4cf',
    src: 'demo-pic07.jpg'
  },
  {
    color: '#e1dad6',
    src: 'demo-pic08.jpg'
  },
]

export default function index() {
  const container = useRef(null);
  const {scrollYProgress} = useScroll({
    target: container,
    offset: ['start end', 'end start']
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, 150])
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -150])
  const height = useTransform(scrollYProgress, [0, 0.9], [50, 0])

  return (
    <div ref={container} className={styles.slidingGallery}>
      <motion.div style={{x:x1}} className={styles.slider}>
        {
          slider01.map((project, index)=>{
            return <div className={styles.project} style={{backgroundColor: project.color}}>
              <div className={styles.itemContainer}>
                <Image
                fill={true}
                alt={'image'}
                src={`/images/${project.src}`} />
              </div>
            </div>
          })
        }
      </motion.div>
      <motion.div style={{x:x2}} className={styles.slider}>
        {
          slider02.map((project, index)=>{
            return <div className={styles.project} style={{backgroundColor: project.color}}>
              <div className={styles.itemContainer}>
                <Image
                fill={true}
                alt={'image'}
                src={`/images/${project.src}`} />
              </div>
            </div>
          })
        }
      </motion.div>
      <motion.div style={{height}} className={styles.circleContainer}>
        <div className={styles.circle}></div>
      </motion.div>

    </div>
  )
}
