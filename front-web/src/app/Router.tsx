import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import HomeView from '../views/HomeView';
import LoginView from '../views/LoginView';
import SignUpView from '../views/SignUpView';
<<<<<<< HEAD
=======
import PlaygroundView from '../views/PlaygroundView';
>>>>>>> refs/remotes/origin/poc

const Router = () => (
	<BrowserRouter>
		<Routes>
			<Route path="/" element={<HomeView />} />
			<Route path="/login" element={<LoginView />} />
			<Route path="/signup" element={<SignUpView />} />
<<<<<<< HEAD
=======
			<Route path="/playground" element={<PlaygroundView />} />
>>>>>>> refs/remotes/origin/poc
			<Route path="*" element={<Navigate to="/" replace />} />
		</Routes>
	</BrowserRouter>
);

export default Router;
