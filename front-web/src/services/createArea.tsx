import { myObject } from '../views/VariablesView';

import Json_conf from '../conf/setup.json';

const createAreaRequest = async ({ service_act, action, action_args, service_rea, reaction, reaction_args } : { service_act: string, action: string, action_args: string, service_rea: string, reaction: string, reaction_args: string } ): Promise<boolean> => {
	const response = await fetch('https://' + Json_conf.back_end.ip + Json_conf.back_end.port + '/api/v1/area/create', {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token: myObject.token,
            service_act: service_act,
            action: action,
            action_args: action_args,
            service_rea: service_rea,
            reaction: reaction,
            reaction_args: reaction_args
		}),
	});
    const result = await response.json();
    console.log(result);
	return result.status;
};

export { createAreaRequest };
