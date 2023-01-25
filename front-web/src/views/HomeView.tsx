import { Image, Box, Center, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HomeView = () => {
	const navigate = useNavigate();
	const handleSignUp = () => {
		navigate('/signup');
	};
	const handleLogin = () => {
		navigate('/login');
	};
	const handlePlayground = () => {
		navigate('/playground');
	};
	const handleDownload = () => {
		navigate('/client.apk');
	};

	return (
		<Box bgImage="pictures/background.png" backgroundSize="cover" h="calc(100vh)">
			<Center>
				<Image marginTop={312} src="pictures/logo.png" />
			</Center>
			<Center>
				<Button marginTop={40} colorScheme="blue" size="lg" onClick={handleLogin}>
					Log in
				</Button>
				<Button marginTop={40} marginLeft={100} colorScheme="blue" size="lg" onClick={handleSignUp}>
					Sign up
				</Button>
			</Center>
			<Center>
				<Button bottom={'calc(-25vh)'} colorScheme="blue" size="lg" onClick={handleDownload}>
					Download Page
				</Button>
				<Button bottom={'calc(-25vh)'} marginLeft={100} colorScheme="blue" size="lg" onClick={handlePlayground}>
					Playground
				</Button>
			</Center>
		</Box>
	);
};

export default HomeView;
