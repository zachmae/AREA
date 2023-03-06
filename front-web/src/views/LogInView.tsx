import { Box, Button, Center, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import JSON from 'json5';
import HmacSHA256 from 'crypto-js/hmac-sha256';
import Base64 from 'crypto-js/enc-base64';
import jwt_decode from 'jwt-decode';

import { getAbout } from '../services/getAbout';

import { SignInRequestService, GoogleSignInRequestService } from '../services/SignServices';
import { GoogleLogin } from '@react-oauth/google';
import { refreshTokenSetup } from '../components/refreshGoogleToken';

import { getAreaList } from '../services/AreaListRequest';

import { myObject } from './VariablesView';

import './Login-upView.css';

type JWTDeCode = {
	aud: string;
	azp: string;
	email: string;
	email_verified: boolean;
	exp: number;
	given_name: string;
	iat: number;
	iss: string;
	jti: string;
	name: string;
	nbf: number;
	picture: string;
	sub: string;
};

const LoginView = ({ setAreas }: any) => {
	const [textinputuser, setTextInputuser] = useState('PLACEHOLDER');
	const [textinputpassword, setTextInputpassword] = useState('PLACEHOLDER');
	const [response, setResponse] = useState('');
	const handleRequestAreaList = () => {
		console.log(myObject.token);
		getAreaList()
			.then((response) => {
				console.log(response);
				console.log('ok');
				setAreas(response.areas);
			})
			.catch((error) => {
				console.error('error');
			});
	};
	const [sampleJSON, setSampleJSON] = useState({
		client: {
			host: '',
		},
		server: {
			current_time: 0,
			services: [
				{
					name: '',
					action: [
						{
							name: '',
							description: '',
							args: [''],
						},
					],
					reaction: [
						{
							name: '',
							description: '',
							args: [''],
						},
					],
				},
			],
		},
	});
	const handleRequestAbout = () => {
		getAbout()
			.then((response) => {
				console.log(response);
				console.log('ok');
				setSampleJSON(response);
				console.log(sampleJSON);
			})
			.catch((error) => {
				console.error('error');
			});
		console.log(sampleJSON);
	};
	const handleSignIn = () => {
		if (textinputuser.includes('@')) {
			const hash = HmacSHA256(textinputpassword, 'area-secret');
			const hashInBase64 = Base64.stringify(hash).toString();
			setResponse('Logging in...');
			SignInRequestService({ username: textinputuser, password: hashInBase64 })
				.then((response) => {
					console.log(response);
					setResponse(response.message);
					if (response.token == '') {
						return;
					}
					myObject.token = response.token;
					myObject.email = textinputuser;
					handleRequestAreaList();
					handleRequestAbout();
					navigate('/area-list');
				})
				.catch((error) => {
					console.error(error);
					setResponse('Error');
				});
			// navigate('/area-list'); // temporary
		}
		// console.log(response);
	};

	const handleGoogleConnect = () => {
		if (myObject.email != '') {
			GoogleSignInRequestService({ username: myObject.email })
				.then((response) => {
					console.log(response);
					setResponse(response.message);
					if (response.token == '') {
						return;
					}
					myObject.token = response.token;
					myObject.email = textinputuser;
					handleRequestAreaList();
					navigate('/area-list');
				})
				.catch((error) => {
					console.error(error);
					setResponse('Error');
				});
		}
	};

	const navigate = useNavigate();

	const [show, setShow] = React.useState(false);
	const handleClick = () => setShow(!show);

	return (
		<Box bgImage="pictures/banner.png" backgroundSize="contain" backgroundRepeat="no-repeat" h="calc(100vh)">
			<div className="login-up">
				<h1 id="login-up-title">LOG IN</h1>
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
					</div>
					<div className="submit-button">
						<Button type="submit" colorScheme="blue" onClick={handleSignIn}>
							Login
						</Button>
					</div>
				</div>
				<Center>
					<Text>{response}</Text>
				</Center>
				<Center marginTop={30}>
					<GoogleLogin
						onSuccess={(credentialResponse) => {
							console.log(credentialResponse);
							refreshTokenSetup(credentialResponse);
							const token = credentialResponse.credential;
							const decoded: JWTDeCode = jwt_decode(String(token));
							myObject.email = decoded.email;
							console.log(myObject.email);
						}}
						onError={() => {
							console.log('Login Failed');
						}}
						useOneTap
					/>
				</Center>
				<Center marginTop={5}>
					<Button type="submit" colorScheme="blue" onClick={handleGoogleConnect}>
						Connect with google
					</Button>
				</Center>
			</div>
		</Box>
	);
};

export default LoginView;
