import React, { ErrorInfo } from 'react';
import styles from './errorBoundary.module.scss';
import {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from 'src/interfaces/interface';
import Image from 'next/image';

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  resetError = () => {
    return this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles['error-container']}>
          <Image
            className="error-img"
            src="/src/assets/imgs/loading.gif"
            alt=""
          />
          <h1>Oops!</h1>
          <h2>Something went wrong.</h2>
          <h2>{`Don't worry, we're already working on it.`}</h2>
          <button className="error-button-reset" onClick={this.resetError}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
