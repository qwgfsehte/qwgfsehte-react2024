import styles from 'Components/App/app.module.scss';

function LoadingIndicator() {
  return (
    <div className={styles['loading-indicator']}>
      <img
        className={styles['loading-img']}
        src="/assets/imgs/loading.gif"
        alt="Loading"
      />
      Loading...
    </div>
  );
}

export default LoadingIndicator;
