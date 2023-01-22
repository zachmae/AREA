import { Button, Input } from '@chakra-ui/react'
import PasswordInput from '../components/PasswordInput'

const LoginView = () => (
	<div>
		<h1>Login</h1>
		<form>
			<label>
    	    {/* <p>Email</p>
    	    <input type="text" name="identifier" /> */}
			<Input placeholder='Email' />
    	  </label>
    	  <label>
    	      {/* <p>Password</p>
    	      <input type="password" /> */}
			  <PasswordInput />
    	  </label>
    	  <div>
    	    {/* <button type="submit">Submit</button> */}
			<Button colorScheme='blue'>Login</Button>
    	  </div>
    	</form>
	</div>
);

export default LoginView;
