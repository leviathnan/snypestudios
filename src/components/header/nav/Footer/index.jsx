import styles from './style.module.scss';

export default function index(){
  return(
    <div className={styles.footer} >
      <a>Instagram</a>
      <a>LinkedIn</a>
      <a>Discord</a>
      <a>YouTube</a>
    </div>
  )
}