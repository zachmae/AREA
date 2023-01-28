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
<<<<<<< HEAD
=======
	const handlePlayground = () => {
		navigate('/playground');
	};
	const handleDownload = () => {
		window.location.href = 'client.apk';
	};
>>>>>>> refs/remotes/origin/poc

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
<<<<<<< HEAD
=======
			<Center>
				<Button bottom={'calc(-25vh)'} colorScheme="blue" size="lg" onClick={handleDownload}>
					Download the Android app
				</Button>
				<Button bottom={'calc(-25vh)'} marginLeft={100} colorScheme="blue" size="lg" onClick={handlePlayground}>
					Playground
				</Button>
			</Center>
>>>>>>> refs/remotes/origin/poc
		</Box>
	);
};

export default HomeView;
