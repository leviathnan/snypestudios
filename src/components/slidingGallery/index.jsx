import {useRef} from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import styles from './style.module.scss'
import Image from 'next/image'

const slider01 = [
  {
    color: "#e3e5e7",
    src: "https://utfs.io/f/89adeaa0-a2bd-4d75-a565-4131b2655d8b-ta6aht.jpg",
  },
  {
    color: "#d6d7dc",
    src: "https://utfs.io/f/d297518b-4911-4a6d-bca3-aaf6a20c095e-ta6ahu.jpg",
  },
  {
    color: "#e3e3e3",
    src: "https://utfs.io/f/b3bb4377-7ba6-4aad-871c-1d63550398a7-ta6ahv.jpg",
  },
  {
    color: "#21242b",
    src: "https://utfs.io/f/ee8372e1-589a-4a40-9680-451a68f1b164-ta6ahw.jpg",
  },
];

const slider02 = [
  {
    color: "#d4e3ec",
    src: "https://utfs.io/f/b0734153-870a-4622-977a-2ef2f9796638-ta6ahx.jpg",
  },
  {
    color: "#e5e0e1",
    src: "https://utfs.io/f/4ebc4a65-c677-433e-b857-dfea4336b91b-ta6ahy.jpg",
  },
  {
    color: "#d7d4cf",
    src: "https://utfs.io/f/a30c6c55-f35f-4f02-aa71-1dda9a4535d6-ta6ahz.jpg",
  },
  {
    color: "#e1dad6",
    src: "https://utfs.io/f/2ef3b3e6-8e41-4aa0-a5a7-2e2abfafa2e3-ta6ai0.jpg",
  },
];

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
                src={`${project.src}`} />
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
                src={`${project.src}`} />
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
