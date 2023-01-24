import { Box, Button, Input } from '@chakra-ui/react';
import PasswordInput from '../components/PasswordInput';
import { useNavigate } from 'react-router-dom';

import './Login-upView.css';

const LoginView = () => {
	const navigate = useNavigate();
	const handleLogin = () => {
		navigate('/area-list');
	};

	return (
		<Box bgImage="pictures/banner.png" backgroundSize="contain" backgroundRepeat="no-repeat" h="calc(100vh)">
			<div className="login-up">
				<h1 id="login-up-title">LOG IN</h1>
				<form className="form-login-up">
					<div className="login-up-labels">
						<div className="login-up-label">
							<label>
								<Input placeholder="Email" />
							</label>
						</div>
						<div className="login-up-label">
							<label>
								<PasswordInput />
							</label>
						</div>
					</div>
					<div className="submit-button">
						<Button type="submit" colorScheme="blue" onClick={handleLogin}>
							Login
						</Button>
					</div>
				</form>
			</div>
		</Box>
	);
};

export default LoginView;
