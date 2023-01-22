import { Button, Input } from '@chakra-ui/react'
import PasswordInput from '../components/PasswordInput'

const SignUpView = () => (
	<div>
		<h1>Sign up</h1>
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
			<Button colorScheme='blue'>Sign up</Button>
    	  </div>
    	</form>
	</div>
);

export default SignUpView;
