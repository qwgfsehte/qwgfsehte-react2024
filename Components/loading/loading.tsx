import styles from 'Components/App/app.module.scss';
import Image from 'next/image';

function LoadingIndicator() {
  return (
    <div className={styles['loading-indicator']}>
      <Image
        className={styles['loading-img']}
        src="/assets/imgs/loading.gif"
        alt="Loading"
      />
      Loading...
    </div>
  );
}

export default LoadingIndicator;
