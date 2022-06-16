import styles from './index.module.css'

function ProgressBar({ height }) {
  return (
    <div className={styles.progress_bar_container}>
      <div
        className={styles.progress_bar}
        style={{ height: `${height}%` }}
      ></div>
    </div>
  )
}
export default ProgressBar
