import { RouterProvider } from 'react-router-dom';
import { router } from './routers/roters.jsx';
import { useEffect } from 'react';

function App() {
	useEffect(() => {
		const preventZoom = (e: any) => {
			if (e.touches.length > 1) e.preventDefault();
		};
		document.addEventListener("touchmove", preventZoom, { passive: false });
		return () => document.removeEventListener("touchmove", preventZoom);
	}, []);

	return <RouterProvider router={router} />;
}

export default App;
