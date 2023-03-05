// REQUEST NAME: SignIn
// Method: POST
// Url: http://127.0.0.1:7000/api/v1/sign/in
// Parameters:
//   username (string)
//   password (string)
// Response:
//   status : int
//   send : 'ok' | 'ko'

import Json_conf from '../conf/setup.json';

const SignInRequestService = async ({
	username,
	password,
}: {
	username: string;
	password: string;
}): Promise<{
	message: string;
	status: boolean;
	token: string;
}> => {
	const response = await fetch('https://' + Json_conf.back_end.ip + Json_conf.back_end.port + '/api/v1/sign/in', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: username,
			password: password,
		}),
	});
	const result = await response.json();
	console.log(result);
	return result;
};

const SignUpRequestService = async ({
	username,
	password,
}: {
	username: string;
	password: string;
}): Promise<{
	status: boolean;
    message: string;
}> => {
	const response = await fetch('https://' + Json_conf.back_end.ip + Json_conf.back_end.port + '/api/v1/sign/up', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: username,
			password: password,
		}),
	});
	const result = await response.json();
	console.log(result);
	return result;
};

export { SignInRequestService, SignUpRequestService };
