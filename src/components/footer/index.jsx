'use client'
import { useRef } from 'react';
import styles from './style.module.scss';
import Image from 'next/image';
import { useScroll, motion, useTransform} from 'framer-motion';
import Magnetic from '../../common/magnetic';
import Rounded from '../../common/roundedButton';
import { neue_montreal } from '@/fonts';

export default function index() {
  const container = useRef(null);
  const {scrollYProgress} = useScroll({
    target: container,
    offset: ['start end', 'end end']
  })

  const x = useTransform(scrollYProgress, [0,1], [0,100])
  const y = useTransform(scrollYProgress, [0,1], [-500, 0])
  const rotate = useTransform(scrollYProgress, [0,1], [120, 90])
  return (
    <motion.div style={{y}} ref={container} className={`${styles.contact} ${neue_montreal.className}`}>
      <div className={styles.body}>
        <div className={styles.title}>
          <span>
            <div className={styles.imageContainer}>
              <Image
              fill={true}
              alt={'image'}
              src={`/public/Images/snype_pic02.png`}
              />
            </div>
            <h2>Let's Edit</h2>
          </span>
          <h2>Some Good Shit</h2>
          <motion.div style={{x}} className={styles.buttonContainer}>
            <Rounded backgroundColor={'#334BD3'} className={styles.button}>
              <p>Get in touch</p>
            </Rounded>
          </motion.div>
          <motion.svg style={{rotate, scale:2}} width='9' height='9' viewBox='0 0 9 9' fill='none' xmlns='https://www.w3.0rg/2000/svg'>
          <path d="M8 8.5C8.27614 8.5 8.5 8.27614 8.5 8L8.5 3.5C8.5 3.22386 8.27614 3 8 3C7.72386 3 7.5 3.22386 7.5 3.5V7.5H3.5C3.22386 7.5 3 7.72386 3 8C3 8.27614 3.22386 8.5 3.5 8.5L8 8.5ZM0.646447 1.35355L7.64645 8.35355L8.35355 7.64645L1.35355 0.646447L0.646447 1.35355Z" fill="white"/>
          </motion.svg>
        </div>
        <div className={styles.nav}>
          <Rounded>
            <p>info@snypestudios.com</p>
          </Rounded>
          <Rounded>
            <p>+91 87643 64683 </p>
          </Rounded>
        </div>
        <div className={styles.info}>
          <div>
            <span>
            <h3>Version</h3>
            <p>2023 © Edition</p>
            </span>
            <span>
              <h3>Version</h3>
              <p>11:49 PM GMT+2</p>
            </span>
          </div>
          <div>
            <span>
              <h3>Socials</h3>
              <Magnetic>
                <p>Awwwards</p>
              </Magnetic>
            </span>
            <Magnetic>
              <p>Instagram</p>
            </Magnetic>
            <Magnetic>
              <p>Dribbble</p>
            </Magnetic>
            <Magnetic>
              <p>LinkedIn</p>
            </Magnetic>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
