// const ActionService = (props: {
// 	listServices: string[];
// 	listActionsTypes: string[];
// 	haveActionTextArea: boolean;
// 	headerActionTextArea: string;
// }) => {
// 	const [ActionTextAreaValue, setTextInputAction] = useState('');
// 	const ActionTextArea = () => {
// 		if (props.haveActionTextArea) {
// 			return (
// 				<div>
// 					<Text fontSize="xl">{props.headerActionTextArea}</Text>
// 					<Textarea
// 						value={ActionTextAreaValue}
// 						onChange={(e) => setTextInputAction(e.target.value)}
// 						placeholder="write your action"
// 						size="sm"
// 					/>
// 				</div>
// 			);
// 		}
// 		return <div></div>;
// 	};
// 	return (
// 		<div className="actionService">
// 			<Text fontSize="4xl">Action:</Text>
// 			<Stack spacing={500} direction="row" className="stackSelection">
// 				<div>
// 					<Text fontSize="xl">Action Service</Text>
// 					<Select placeholder="Select Service">
// 						{props.listServices.map((item, x) => {
// 							return (
// 								<option key={x} value={item}>
// 									{item}
// 								</option>
// 							);
// 						})}
// 					</Select>
// 				</div>
// 				<div>
// 					<Text fontSize="xl">Action Type</Text>
// 					<Select placeholder="Select Action">
// 						{props.listActionsTypes.map((item, x) => {
// 							return (
// 								<option key={x} value={item}>
// 									{item}
// 								</option>
// 							);
// 						})}
// 					</Select>
// 				</div>
// 				<ActionTextArea />
// 			</Stack>
// 		</div>
// 	);
// };


	// const ReactionService = (props: {
	// 	listServices: string[];
	// 	listReactionsTypes: string[];
	// 	haveReactionTextArea: boolean;
	// 	headerReactionTextArea: string;
	// }) => {
	// 	const [ReactionTextAreaValue, setTextInputReaction] = useState('');
	// 	const ReactionTextArea = () => {
	// 		if (props.haveReactionTextArea) {
	// 			return (
	// 				<div>
	// 					<Text fontSize="xl">{props.headerReactionTextArea}</Text>
	// 					<Textarea
	// 						value={ReactionTextAreaValue}
	// 						onChange={(e) => setTextInputReaction(e.target.value)}
	// 						placeholder="write your Reaction"
	// 						size="sm"
	// 					/>
	// 				</div>
	// 			);
	// 		}
	// 		return <div></div>;
	// 	};
	// 	return (
	// 		<div className="actionService">
	// 			<Text fontSize="4xl">Reaction:</Text>
	// 			<Stack spacing={500} direction="row" className="stackSelection">
	// 				<div>
	// 					<Text fontSize="xl">Reaction Service</Text>
	// 					<Select placeholder="Select Service">
	// 						{props.listServices.map((item, x) => {
	// 							return (
	// 								<option key={x} value={item}>
	// 									{item}
	// 								</option>
	// 							);
	// 						})}
	// 					</Select>
	// 				</div>
	// 				<div>
	// 					<Text fontSize="xl">Reaction Type</Text>
	// 					<Select placeholder="Select Reaction">
	// 						{props.listReactionsTypes.map((item, x) => {
	// 							return (
	// 								<option key={x} value={item}>
	// 									{item}
	// 								</option>
	// 							);
	// 						})}
	// 					</Select>
	// 				</div>
	// 				<ReactionTextArea />
	// 			</Stack>
	// 		</div>
	// 	);
	// };

const testView = () => {
    return (<div></div>);
}

export default testView;