import { Button, Input } from '@chakra-ui/react'
import PasswordInput from '../components/PasswordInput'

const SignUpView = () => (
	<div>
		<h1>Sign up</h1>
		<form>
			<label>
			<Input placeholder='Email' />
    	  	</label>
    	  	<label>
				  <PasswordInput />
    	  	</label>
    	  	<div>
				<Button type="submit" colorScheme='blue'>Sign up</Button>
    	  	</div>
    	</form>
	</div>
);

export default SignUpView;
