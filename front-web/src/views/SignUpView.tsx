import { Box, Button, Center, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import JSON from 'json5';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';

import { SignUpRequestService } from '../services/SignServices';

import './Login-upView.css';

const LoginView = () => {
	const [textinputuser, setTextInputuser] = useState('PLACEHOLDER');
	const [textinputpassword, setTextInputpassword] = useState('PLACEHOLDER');
	const [textinputsecondpassword, setTextInputsecondpassword] = useState('PLACEHOLDER');
	const [response, setResponse] = useState('');

	const isGoodPassword = () => {
		if (textinputpassword != textinputsecondpassword) {
			setResponse('Error: The two passwords entered are not the same');
			return false;
		}
		if (textinputpassword.length < 8) {
			setResponse('Error: The password must be at least 8 characters long');
			return false;
		}
		return true;
	};

	const handleSignUp = () => {
		if (textinputuser.includes('@')) {
			if (isGoodPassword()) {
				const hash = HmacSHA256(textinputpassword, 'area-secret');
				const hashInBase64 = Base64.stringify(hash).toString();
				setResponse('Logging in...');
				SignUpRequestService({ username: textinputuser, password: hashInBase64 })
					.then((response) => {
						setResponse(response.message);
						navigate('/login');
					})
					.catch((error) => {
						console.error(error);
						setResponse('Error');
					});
			}
		}
		console.log(response);
	};
	const navigate = useNavigate();

	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	return (
		<Box bgImage="pictures/banner.png" backgroundSize="contain" backgroundRepeat="no-repeat" h="calc(100vh)">
			<div className="login-up">
				<h1 id="login-up-title">Sign up</h1>
				<div className="form-login-up">
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
						<div className="login-up-label">
							<label>
								<InputGroup size="md">
									<Input
										pr="4.5rem"
										type={show ? 'text' : 'password'}
										placeholder="Enter password"
										onChange={(e) => setTextInputsecondpassword(e.target.value)}
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
				</div>
				<Center>
					<Text>{response}</Text>
				</Center>
			</div>
		</Box>
	);
};

export default LoginView;
