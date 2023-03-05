import { Box, Image, Input, Button, Center, Text, Select, Stack, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import AreaHeader from '../components/AreaHeader';

import { getAbout } from '../services/getAbout';

import { createAreaRequest } from '../services/createArea';

import { myObject } from './VariablesView';

import './EditView.css';

// const sampleJSON = {
// 	client: {
// 		host: '192.168.1.25',
// 	},
// 	server: {
// 		current_time: 1675445773554,
// 		webhookurl: 'http://142a-eza1-142a-eza1-ngrok.io',
// 		services: [
// 			{
// 				name: 'github',
// 				action: [
// 					{
// 						name: 'github-repository-publicise',
// 						type: 'hook',
// 						description: 'This event occurs when repository visibility changes from private to public.',
// 						args: ['owner', 'repo'],
// 					},
// 					{
// 						name: 'github-star-created',
// 						type: 'hook',
// 						description: 'This event occurs when someone starred a repository.',
// 						args: ['owner', 'repo'],
// 					},
// 				],
// 				reaction: [
// 					{
// 						name: 'github-send-email',
// 						description: 'This action sends an email to the specified email address.',
// 						args: ['email'],
// 					},
// 				],
// 			},
// 			{
// 				name: 'discord',
// 				action: [
// 					{
// 						name: 'message',
// 						type: 'hook',
// 						description: 'This event occurs when repository visibility changes from private to public.',
// 						args: ['owner', 'repo'],
// 					},
// 					{
// 						name: 'event',
// 						type: 'hook',
// 						description: 'This event occurs when someone starred a repository.',
// 						args: ['owner', 'repo'],
// 					},
// 				],
// 				reaction: [
// 					{
// 						name: 'mail',
// 						description: 'This action sends an email to the specified email address.',
// 						args: ['email'],
// 					},
// 				],
// 			},
// 		],
// 	},
// };

const EditView = () => {
	const [sampleJSON, setSampleJSON] = useState({
		client: {
			host: '',
		},
		server: {
			current_time: 0,
			services: [
				{
					name: '',
					action: [
						{
							name: '',
							description: '',
							args: [''],
						},
					],
					reaction: [
						{
							name: '',
							description: '',
							args: [''],
						},
					],
				},
			],
		},
	});

	const [selectedActionService, handleActionService] = useState('');
	const [selectedActionType, handleActionType] = useState('');
	const [ActionArgs, setTextInputActionArgs] = useState('');

	const [selectedReactionService, handleReactionService] = useState('');
	const [selectedReactionType, handleReactionType] = useState('');
	const [ReactionArgs, setTextInputReactionArgs] = useState('');

	const ActionService = () => {
		const listServices = sampleJSON.server.services;
		const [ActionTextAreaValue, setTextInputAction] = useState('');
		const handleReactionsArgs = () => {
			setTextInputActionArgs(ActionTextAreaValue);
			console.log(ActionArgs);
		};
		return (
			<div className="actionService">
				<Text fontSize="4xl">Action:</Text>
				<Stack spacing={500} direction="row" className="stackSelection">
					<div>
						<Text fontSize="xl">Action Service</Text>
						<Select
							placeholder="Select Service"
							value={selectedActionService}
							onChange={(e) => handleActionService(e.target.value)}
						>
							{listServices.map((item, index) => {
								if (item.action) {
									return (
										<option key={index} value={index}>
											{item.name}
										</option>
									);
								}
							})}
						</Select>
					</div>
					<div>
						<Text fontSize="xl">Action Type</Text>
						<Select
							placeholder="Select Action"
							value={selectedActionType}
							onChange={(e) => handleActionType(e.target.value)}
						>
							{listServices[Number(selectedActionService)].action.map((item, index) => {
								return (
									<option key={index} value={index}>
										{item.name}
									</option>
								);
							})}
						</Select>
					</div>
					<div>
						<Text fontSize="xl">Write your actions arguments</Text>
						<Input pr="4.5rem" onChange={(e) => setTextInputAction(e.target.value)} />
						<Button onClick={handleReactionsArgs}>Validate</Button>
					</div>
				</Stack>
			</div>
		);
	};

	const ReactionService = () => {
		const listServices = sampleJSON.server.services;
		const [ReactionTextAreaValue, setTextInputReaction] = useState('');
		const handleReactionsArgs = () => {
			setTextInputReactionArgs(ReactionTextAreaValue);
			console.log(ReactionArgs);
		};
		return (
			<div className="actionService">
				<Text fontSize="4xl">Reaction:</Text>
				<Stack spacing={500} direction="row" className="stackSelection">
					<div>
						<Text fontSize="xl">Reaction Service</Text>
						<Select
							placeholder="Select Service"
							value={selectedReactionService}
							onChange={(e) => handleReactionService(e.target.value)}
						>
							{listServices.map((item, index) => {
								if (item.reaction) {
									return (
										<option key={index} value={index}>
											{item.name}
										</option>
									);
								}
							})}
						</Select>
					</div>
					<div>
						<Text fontSize="xl">Reaction Type</Text>
						<Select
							placeholder="Select Action"
							value={selectedReactionType}
							onChange={(e) => handleReactionType(e.target.value)}
						>
							{listServices[Number(selectedReactionService)].reaction.map((item, index) => {
								return (
									<option key={index} value={index}>
										{item.name}
									</option>
								);
							})}
						</Select>
					</div>
					<div>
						<Text fontSize="xl">Write your rections arguments</Text>
						<Input pr="4.5rem" onChange={(e) => setTextInputReaction(e.target.value)} />
						<Button onClick={handleReactionsArgs}>Validate</Button>
					</div>
				</Stack>
			</div>
		);
	};

	const testArrayActionService = ['Twitch', 'Discord', 'Twitter', 'Google Agenda'];
	const testArrayActionType = ['Start Stream', 'New Sub', 'New Follow'];
	const testArrayReactionService = ['Discord', 'Twitter', 'Google Agenda'];
	const testArrayReactionType = ['Post', 'Join Channel', 'Add Event'];
	const testarray = [];

	const handleRequestAbout = () => {
		getAbout()
			.then((response) => {
				console.log(response);
				console.log('ok');
				setSampleJSON(response);
				console.log(sampleJSON);
			})
			.catch((error) => {
				console.error('error');
			});
		console.log(sampleJSON);
	};

	const createArea = () => {
		const services = sampleJSON.server.services;

		createAreaRequest({
			service_act: services[Number(selectedActionService)].name,
			action: services[Number(selectedActionService)].action[Number(selectedActionType)].name,
			action_args: ActionArgs,
			service_rea: services[Number(selectedReactionService)].name,
			reaction: services[Number(selectedReactionService)].reaction[Number(selectedReactionType)].name,
			reaction_args: ReactionArgs,
		})
			.then((response) => {
				console.log(response);
				console.log('ok');
				// console.log(sampleJSON);
			})
			.catch((error) => {
				console.error('error');
			});
	};

	return (
		<div>
			<AreaHeader currentPage="edit" blackRectanglePosition={750} />
			{/* <ActionService
				listServices={testArrayActionService}
				listActionsTypes={testArrayActionType}
				haveActionTextArea={false}
				headerActionTextArea="nothing"
			/> */}
			<ActionService />
			{/* <ReactionService
				listServices={testArrayReactionService}
				listReactionsTypes={testArrayReactionType}
				haveReactionTextArea={true}
				headerReactionTextArea="nothing"
			/> */}
			<ReactionService />
			<Button colorScheme="blue" className="createButton" onClick={createArea}>
				Create
			</Button>
			<Button onClick={handleRequestAbout}>TEST</Button>
		</div>
	);
};

export default EditView;
