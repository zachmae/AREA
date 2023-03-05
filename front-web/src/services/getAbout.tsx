import {myObject} from '../views/VariablesView';

import Json_conf from '../conf/setup.json';

const getAbout = async (): Promise<{
    client: {
        host: string
    },
    server: {
        current_time: number,
        services: [
            {
                name: string,
                action: [
                    {
                        name: string,
                        type: string,
                        description: string,
                        args: [
                            string
                        ]
                    }
                ],
                reaction: [
                    {
                        name: string,
                        description: string,
                        args: [
                            string
                        ]
                    }
                ]
            }
        ]
    }
}> => {
	const response = await fetch('https://' + Json_conf.back_end.ip + Json_conf.back_end.port + '/about.json', {
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
    console.log(result);
	return result;
};

export { getAbout };