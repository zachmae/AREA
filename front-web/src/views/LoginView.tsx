import { Box, Center } from '@chakra-ui/react';
import { GoogleLogin } from '@react-oauth/google';
import { refreshTokenSetup } from '../components/refreshGoogleToken';

const LoginView = () => {
	return (
		<Box bgImage="pictures/background.png" backgroundSize="cover" h="calc(100vh)">
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
				;
			</Center>
		</Box>
	);
};

export default LoginView;
