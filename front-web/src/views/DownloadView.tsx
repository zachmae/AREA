import { Box, Center, Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const DownloadView = () => {
	const navigate = useNavigate();

	return (
		<Box bgImage="pictures/background.png" backgroundSize="cover" h="calc(100vh)">
			<Center>
				<a href={require('../client.apk')} download="client.apk">
					<Button marginTop={40} colorScheme="blue" size="lg">
						Download the Android app
					</Button>
				</a>
			</Center>
			<Center>
				<Button marginTop={40} colorScheme="blue" size="lg" onClick={() => navigate(-1)}>
					Back
				</Button>
			</Center>
		</Box>
	);
};

export default DownloadView;
