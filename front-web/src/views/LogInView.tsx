import { Box, Button, Center, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import JSON from 'json5';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

import { SignInRequestService } from '../services/SignServices';
import { GoogleLogin } from '@react-oauth/google';
import { refreshTokenSetup } from '../components/refreshGoogleToken';

import './Login-upView.css';

const LoginView = () => {
	const [textinputuser, setTextInputuser] = useState('PLACEHOLDER');
	const [textinputpassword, setTextInputpassword] = useState('PLACEHOLDER');
	const [response, setResponse] = useState('');
	const handleSignIn = () => {
		if (textinputuser.includes('@')) {
			const hash = HmacSHA256(textinputpassword, "area-secret");
			const hashInBase64 = Base64.stringify(hash).toString();
			setResponse('Logging in...');
			SignInRequestService({ username: textinputuser, password: hashInBase64 })
				.then((response) => {
					setResponse(JSON.parse(response).message);
					navigate('/area-list');
				})
				.catch((error) => {
					console.error(error);
					setResponse('Error');
				});
			navigate('/area-list'); // temporary
		}
		console.log(response);
	};
	const navigate = useNavigate();

	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	return (
		<Box bgImage="pictures/banner.png" backgroundSize="contain" backgroundRepeat="no-repeat" h="calc(100vh)">
			<div className="login-up">
				<h1 id="login-up-title">LOG IN</h1>
				<form className="form-login-up">
					<div className="login-up-labels">
						<div className="login-up-label">
							<label>
								<Input type="email" placeholder="Email" onChange={(e) => setTextInputuser(e.target.value)} />
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
						<Button type="submit" colorScheme="blue" onClick={handleSignIn}>
							Login
						</Button>
					</div>
				</form>
				<Center>
					<Text>{response}</Text>
				</Center>
				<Center>
					<GoogleLogin
						onSuccess={(credentialResponse) => {
							console.log(credentialResponse);
							refreshTokenSetup(credentialResponse);
						}}
						onError={() => {
							console.log('Login Failed');
						}}
						useOneTap
					/>
				</Center>
			</div>
		</Box>
	);
};

export default LoginView;
