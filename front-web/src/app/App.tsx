import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import conf from '../conf/setup.json';
import Router from '../app/Router';

const App = () => (
	<GoogleOAuthProvider clientId={conf.API.GoogleKey}>
		<ChakraProvider>
			<Router />
		</ChakraProvider>
	</GoogleOAuthProvider>
);

export default App;
