import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthProvider';
import AppRoutes from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;