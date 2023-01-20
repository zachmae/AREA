import { ChakraProvider } from '@chakra-ui/react';
import Router from '../app/Router';

const App = () => (
	<ChakraProvider>
		<Router />
	</ChakraProvider>
);

export default App;
