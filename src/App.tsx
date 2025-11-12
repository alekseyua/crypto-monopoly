import { RouterProvider } from 'react-router-dom';
import { router } from './routers/roters.jsx';
import { useEffect } from 'react';
import { useNetworkStatus } from './hooks/useNetworkStatus';

function App() {
	const { online, quality, type } = useNetworkStatus(5000);
	useEffect(() => {
		const preventZoom = (e: any) => {
			if (e.touches.length > 1) e.preventDefault();
		};
		document.addEventListener("touchmove", preventZoom, { passive: false });
		return () => document.removeEventListener("touchmove", preventZoom);
	}, []);

	return <>
		<div style={{position: 'absolute', left: '1%', top: '1%', color: '#ff0000', zIndex:99999, backgroundColor: '#a3a1a1ff',opacity: 0, padding: '5px', borderRadius: '5px'}}>
			<p>⚙️ Network Quality: {
				quality === 'good' ? '🟢 Good' :
					quality === 'bad' ? '🟠 Slow' :
						quality === 'offline' ? '🔴 Offline' :
							'⚪ Unknown'
			}</p>
		</div>
		<RouterProvider router={router} />;
	</>
}
export default App;
