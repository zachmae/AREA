import { Box, Image, Button, Center, Text, Select, Stack, Textarea } from '@chakra-ui/react';
import { useState } from 'react';
import AreaHeader from '../components/AreaHeader';

import './EditView.css';

const ActionService = (props: {
	listServices: string[];
	listActionsTypes: string[];
	haveActionTextArea: boolean;
	headerActionTextArea: string;
}) => {
	const [ActionTextAreaValue, setTextInputAction] = useState('');
	const ActionTextArea = () => {
		if (props.haveActionTextArea) {
			return (
				<div>
					<Text fontSize="xl">{props.headerActionTextArea}</Text>
					<Textarea
						value={ActionTextAreaValue}
						onChange={(e) => setTextInputAction(e.target.value)}
						placeholder="write your action"
						size="sm"
					/>
				</div>
			);
		}
		return <div></div>;
	};
	return (
		<div className="actionService">
			<Text fontSize="4xl">Action:</Text>
			<Stack spacing={500} direction="row" className="stackSelection">
				<div>
					<Text fontSize="xl">Action Service</Text>
					<Select placeholder="Select Service">
						{props.listServices.map((item, x) => {
							return (
								<option key={x} value={item}>
									{item}
								</option>
							);
						})}
					</Select>
				</div>
				<div>
					<Text fontSize="xl">Action Type</Text>
					<Select placeholder="Select Action">
						{props.listActionsTypes.map((item, x) => {
							return (
								<option key={x} value={item}>
									{item}
								</option>
							);
						})}
					</Select>
				</div>
				<ActionTextArea />
			</Stack>
		</div>
	);
};

const ReactionService = (props: {
	listServices: string[];
	listReactionsTypes: string[];
	haveReactionTextArea: boolean;
	headerReactionTextArea: string;
}) => {
	const [ReactionTextAreaValue, setTextInputReaction] = useState('');
	const ReactionTextArea = () => {
		if (props.haveReactionTextArea) {
			return (
				<div>
					<Text fontSize="xl">{props.headerReactionTextArea}</Text>
					<Textarea
						value={ReactionTextAreaValue}
						onChange={(e) => setTextInputReaction(e.target.value)}
						placeholder="write your Reaction"
						size="sm"
					/>
				</div>
			);
		}
		return <div></div>;
	};
	return (
		<div className="actionService">
			<Text fontSize="4xl">Reaction:</Text>
			<Stack spacing={500} direction="row" className="stackSelection">
				<div>
					<Text fontSize="xl">Reaction Service</Text>
					<Select placeholder="Select Service">
						{props.listServices.map((item, x) => {
							return (
								<option key={x} value={item}>
									{item}
								</option>
							);
						})}
					</Select>
				</div>
				<div>
					<Text fontSize="xl">Reaction Type</Text>
					<Select placeholder="Select Reaction">
						{props.listReactionsTypes.map((item, x) => {
							return (
								<option key={x} value={item}>
									{item}
								</option>
							);
						})}
					</Select>
				</div>
				<ReactionTextArea />
			</Stack>
		</div>
	);
};

const EditView = () => {
	const testArrayActionService = ['Twitch', 'Discord', 'Twitter', 'Google Agenda'];
	const testArrayActionType = ['Start Stream', 'New Sub', 'New Follow'];
	const testArrayReactionService = ['Discord', 'Twitter', 'Google Agenda'];
	const testArrayReactionType = ['Post', 'Join Channel', 'Add Event'];
	return (
		<div>
			<AreaHeader currentPage="edit" blackRectanglePosition={750} />
			<ActionService
				listServices={testArrayActionService}
				listActionsTypes={testArrayActionType}
				haveActionTextArea={false}
				headerActionTextArea="nothing"
			/>
			<ReactionService
				listServices={testArrayReactionService}
				listReactionsTypes={testArrayReactionType}
				haveReactionTextArea={true}
				headerReactionTextArea="nothing"
			/>
			<Button colorScheme='blue' className="createButton">Create</Button>
		</div>
	);
};

export default EditView;
