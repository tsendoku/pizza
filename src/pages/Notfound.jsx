import React from 'react';
import styles from './Notfound.module.scss';

function Notfound() {
  return (
    <div className={styles.root}>
      <h1>
        <span>:( </span>
        <br />
        Not Found
      </h1>
      <p className={styles.description}>There is no such page in our site</p>
    </div>
  );
}

export default Notfound;
