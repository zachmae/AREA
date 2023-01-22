import { Button, Input } from '@chakra-ui/react'
import PasswordInput from '../components/PasswordInput'

const LoginView = () => (
	<div>
		<h1>Login</h1>
		<form>
			<label>
			<Input placeholder='Email' />
    	  	</label>
    	  	<label>
			  <PasswordInput />
    	  	</label>
    	  	<div>
				<Button type="submit" colorScheme='blue'>Login</Button>
    	  	</div>
    	</form>
	</div>
);

export default LoginView;
