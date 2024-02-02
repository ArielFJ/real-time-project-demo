import React from 'react'
import map from './img/map.jpg'
import plane from './img/indy-plane.jpg'
import styles from './styles.module.css'

function IndianaJonesMovie() {
  return (
    <div className={styles.wrapper}>
      <img className={styles.plane} src={plane} />
      <div className={styles.mapWrapper}>
        <img className={styles.map} src={map} />
        <svg
          width="3069"
          height="1182"
          viewBox="0 0 3069 1182"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={styles.svg}
        >
          <path
            className={styles.indy}
            d="M2 118L549 6L683 350L1022 389"
            stroke="#CE1616"
            strokeWidth="10"
          />
        </svg>
        <div className={`${styles.circle} ${styles.usa}`}></div>
        <div className={`${styles.circle} ${styles.sweden}`}></div>
        <div className={`${styles.circle} ${styles.madagascar}`}></div>
        <div className={`${styles.circle} ${styles.australia}`}></div>
      </div>
    </div>

  )
}

export default IndianaJonesMovie
