import { RouterProvider } from 'react-router-dom';
import router from './routes/routes';
import './app.css';

const App = () => {
  return (
    <div className='app'>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
