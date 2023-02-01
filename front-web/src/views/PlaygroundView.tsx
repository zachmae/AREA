import { Text, Box, Center, Button, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import JSON from 'json5';
import { SignInRequestService } from '../services/SignServices';

const TestService = async (): Promise<string> => {
	const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json');
	const result = await response.json();
	return result.bpi.EUR.rate;
};

const PlaygroundView = () => {
	const navigate = useNavigate();

	const [toggle, settoggle] = useState('PLACEHOLDER');

	const handleButton = () => {
		if (toggle == 'PLACEHOLDER') settoggle('HELLO WORLD');
		else settoggle('PLACEHOLDER');
	};

	const handleMenu = () => {
		navigate('/');
	};

	const [bitcoinValue, setBitcoinValue] = useState('PLACEHOLDER');

	const getBitcoinValue = () => {
		console.log('setting bitcoin value');
		TestService().then((response) => {
			setBitcoinValue(response);
		});
	};

	const [textinputuser, setTextInputuser] = useState('PLACEHOLDER');
	const [textinputpassword, setTextInputpassword] = useState('PLACEHOLDER');
	const [response, setResponse] = useState('Not logged in');

	const handleSignIn = () => {
		console.log('test');
		setResponse('Logging in...');
		SignInRequestService({ username: textinputuser, password: textinputpassword })
			.then((response) => {
				setResponse(JSON.parse(response).message);
			})
			.catch((error) => {
				console.error(error);
				setResponse('Error');
			});
		console.log(response);
	};

	return (
		<Box bgImage="pictures/background.png" backgroundSize="cover" h="calc(100vh)">
			<Center>
				<Text>Playground</Text>
			</Center>
			<Button colorScheme="blue" size="lg" onClick={handleButton}>
				Button
			</Button>
			<Text>{toggle}</Text>
			<Button colorScheme="blue" size="lg" onClick={getBitcoinValue}>
				Get Bitcoin Value
			</Button>
			<Text>{bitcoinValue}</Text>
			<Button colorScheme="blue" size="lg" onClick={handleMenu}>
				Menu
			</Button>
			<Center>
				<Input placeholder="Username" onChange={(e) => setTextInputuser(e.target.value)} />
			</Center>
			<Center>
				<Input placeholder="Password" onChange={(e) => setTextInputpassword(e.target.value)} type="text" />
			</Center>
			<Center>
				<Button colorScheme="blue" size="lg" onClick={handleSignIn}>
					Test
				</Button>
			</Center>
			<Center>
				<Text>{response}</Text>
			</Center>
		</Box>
	);
};

export default PlaygroundView;
