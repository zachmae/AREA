import { Box, Button, Center, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import JSON from 'json5';
import { SignUpRequestService } from '../services/SignServices';

import './Login-upView.css';

const LoginView = () => {
	const [textinputuser, setTextInputuser] = useState('PLACEHOLDER');
	const [textinputpassword, setTextInputpassword] = useState('PLACEHOLDER');
	const [response, setResponse] = useState('');
	const handleSignUp = () => {
		console.log('test');
		setResponse('Logging in...');
		SignUpRequestService({ username: textinputuser, password: textinputpassword })
			.then((response) => {
				setResponse(JSON.parse(response).message);
				navigate('/area-list');
			})
			.catch((error) => {
				console.error(error);
				setResponse('Error');
			});
		console.log(response);
	};
	const navigate = useNavigate();

	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	return (
		<Box bgImage="pictures/banner.png" backgroundSize="contain" backgroundRepeat="no-repeat" h="calc(100vh)">
			<div className="login-up">
				<h1 id="login-up-title">Sign up</h1>
				<form className="form-login-up">
					<div className="login-up-labels">
						<div className="login-up-label">
							<label>
								<Input placeholder="Email" onChange={(e) => setTextInputuser(e.target.value)} />
							</label>
						</div>
						<div className="login-up-label">
							<label>
								<InputGroup size="md">
									<Input
										pr="4.5rem"
										type={show ? 'text' : 'password'}
										placeholder="Enter password"
										onChange={(e) => setTextInputpassword(e.target.value)}
									/>
									<InputRightElement width="4.5rem">
										<Button h="1.75rem" size="sm" onClick={handleClick}>
											{show ? 'Hide' : 'Show'}
										</Button>
									</InputRightElement>
								</InputGroup>
							</label>
						</div>
					</div>
					<div className="submit-button">
						<Button type="submit" colorScheme="blue" onClick={handleSignUp}>
							Sign up
						</Button>
					</div>
				</form>
				<Center>
					<Text>{response}</Text>
				</Center>
			</div>
		</Box>
	);
};

export default LoginView;
