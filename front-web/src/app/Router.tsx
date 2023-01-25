import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import SignUpView from '../views/SignUpView';
import PlaygroundView from '../views/PlaygroundView';
import DownloadView from '../views/DownloadView';

const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route path="/login" element={<LoginView />} />
			<Route path="/signup" element={<SignUpView />} />
			<Route path="/playground" element={<PlaygroundView />} />
			<Route path="/client.apk" element={<DownloadView />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	</BrowserRouter>
);

export default Router;
