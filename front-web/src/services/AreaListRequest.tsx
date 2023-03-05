import {myObject} from '../views/VariablesView';

import Json_conf from '../conf/setup.json';

const getAreaList = async (): Promise<{
	status: boolean;
	areas: {
		id: number;
		createdAt: string;
		updatedAt: string;
		serviceAct: string;
		action: string;
		actionArgs: string;
		actionData: string;
		serviceRea: string;
		reaction: string;
		reactionArgs: string;
		authorId: number;
		active: boolean;
	}[];
}> => {
	const response = await fetch('https://' + Json_conf.back_end.ip + Json_conf.back_end.port + '/api/v1/area/get', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: myObject.token
		}),
	});
	const result = await response.json();
	return result;
};

export { getAreaList };
