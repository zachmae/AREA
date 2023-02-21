import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import AreaListView from '../views/AreaListView';
import EditView from '../views/EditView';
import HomeView from '../views/HomeView';
import LoginView from '../views/LogInView';
import LogsView from '../views/LogsView';
import SignUpView from '../views/SignUpView';
import PlaygroundView from '../views/PlaygroundView';
import ProfilView from '../views/ProfilView';

const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route path="/login" element={<LoginView />} />
			<Route path="/signup" element={<SignUpView />} />
			<Route path="/area-list" element={<AreaListView />} />
			<Route path="/edit" element={<EditView />} />
			<Route path="/logs" element={<LogsView />} />
			<Route path="/profil" element={<ProfilView />} />
			<Route path="/playground" element={<PlaygroundView />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	</BrowserRouter>
);

export default Router;
