import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';

const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route path="/login" element={<LoginView />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	</BrowserRouter>
);

export default Router;
