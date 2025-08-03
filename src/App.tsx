import { RouterProvider } from 'react-router-dom';
import { router } from './routers/roters.jsx';

function App() {
	return <RouterProvider router={router} />;
}

export default App;
