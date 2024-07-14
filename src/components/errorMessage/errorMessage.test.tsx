import { describe, test, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorMessage from './errorMessage';

describe('test error message component', () => {
  describe('test basic props', () => {
    const testProps = {
      errorMessage: 'test error',
    };

    test('render error message when there is an error', () => {
      render(<ErrorMessage errorMessage={testProps.errorMessage} />);
      expect(screen.getByAltText('pokemon-for-error')).toHaveAttribute(
        'src',
        './src/assets/imgs/error-search.png'
      );
      expect(screen.getByText('test error')).toBeInTheDocument();
    });
  });
});
