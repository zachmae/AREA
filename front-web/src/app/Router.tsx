import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import AreaListView from '../views/AreaListView';
import HomeView from '../views/HomeView';
import LoginView from '../views/LogInView';
import SignUpView from '../views/SignUpView';
import PlaygroundView from '../views/PlaygroundView';

const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route path="/login" element={<LoginView />} />
			<Route path="/signup" element={<SignUpView />} />
<<<<<<< HEAD
=======
			<Route path="/area-list" element={<AreaListView />} />
>>>>>>> main
			<Route path="/playground" element={<PlaygroundView />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	</BrowserRouter>
);

export default Router;
