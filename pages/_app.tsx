import { Provider } from 'react-redux';
import store from '../Components/store';
import { AppContent } from '../Components/App/appLayout';
import { ThemeProvider } from '../Components/context/themeContext';
import '../styles/global.scss';
import ErrorBoundary from 'Components/errorBoundary/errorBoundary';

function MyApp() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <ErrorBoundary>
          <AppContent />
        </ErrorBoundary>
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
