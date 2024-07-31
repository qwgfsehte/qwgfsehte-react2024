import styles from './loading.module.scss';
import Image from 'next/image';

function LoadingIndicator() {
  return (
    <div className={styles['loading-indicator']}>
      <Image
        className={styles['loading-img']}
        src="/assets/imgs/loading.gif"
        alt="Loading"
        width={400}
        height={300}
        priority
      />
      Loading...
    </div>
  );
}

export default LoadingIndicator;
