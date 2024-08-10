import React from "react";
import styles from './style.module.scss';
import { motion } from "framer-motion";
import { opacity, expand } from "./anim";

const PageTransition = ({ children, isExiting
 }) => {
  console.log('isExiting:', isExiting); // Add this line
  const backgroundColor = "#fff"
  const anim = (variants, custom = null) => {
    return {
      initial: "initial",
      animate: isExiting ? "exit":"enter",
      exit: "exit",
      custom,
      variants,
    };
  };

  const nbOfColumns = 5;
  return (
    <div className={styles.stairs} style={{ backgroundColor }}>
      <motion.div {...anim(opacity)} className={styles.transitionBackground} />
      <div className={styles.transitionContainer}>
        {[...Array(nbOfColumns)].map((_, i) => {
          return <motion.div key={i} {...anim(expand, nbOfColumns - i)} />;
        })}
      </div>
      {children}
    </div>
  );
};

export default PageTransition;