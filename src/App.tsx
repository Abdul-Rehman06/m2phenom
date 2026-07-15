import { AppRoutes } from './routes';
import { ThemeProvider, AuthProvider } from '@/contexts';
import { ErrorBoundary } from '@/components';

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="m2-phenom-theme">
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
