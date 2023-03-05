import {myObject} from '../views/VariablesView';

import Json_conf from '../conf/setup.json';

const setAreaAvailable = async ({
	areaId,
}: {
	areaId: number;
}): Promise<boolean> => {
	const response = await fetch('https://' + Json_conf.back_end.ip + Json_conf.back_end.port + '/api/v1/area/activate', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: myObject.token,
            area_id: areaId
		}),
	});
	const result = await response.json();
	return result;
};

const setAreaDisable = async ({
	areaId,
}: {
	areaId: number;
}): Promise<boolean> => {
	const response = await fetch('https://' + Json_conf.back_end.ip + Json_conf.back_end.port + '/api/v1/area/deactivate', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: myObject.token,
            area_id: areaId
		}),
	});
	const result = await response.json();
	return result;
};

const deleteAreaRequest = async ({
	areaId,
}: {
	areaId: number;
}): Promise<boolean> => {
	const response = await fetch('https://' + Json_conf.back_end.ip + Json_conf.back_end.port + '/api/v1/area/delete', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: myObject.token,
            area_id: areaId
		}),
	});
	const result = await response.json();
	return result;
};

export { setAreaAvailable, setAreaDisable, deleteAreaRequest };