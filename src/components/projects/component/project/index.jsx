'use client';
import React from "react";
import styles from './style.module.scss'
import { neue_montreal } from "@/fonts"

export default function index({index, title, manageModal}) {

  return(
    <div onMouseEnter={(e) => {manageModal(true, index, e.clientX, e.clientY)}} onMouseLeave={(e) => {manageModal(false, index, e.clientX, e.clientY)}} className={`${styles.project} ${neue_montreal.className}`}>
            <h2>{title}</h2>
            <p>Design & Development</p>
      </div>
  )
  
}