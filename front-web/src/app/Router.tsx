import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import AreaListView from '../views/AreaListView';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import SignUpView from '../views/SignUpView';

const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route path="/login" element={<LoginView />} />
			<Route path="/signup" element={<SignUpView />} />
			<Route path="/area-list" element={<AreaListView />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	</BrowserRouter>
);

export default Router;
