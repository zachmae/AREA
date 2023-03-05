import { Box, Button, Image, Text, Stack } from '@chakra-ui/react';

import { myObject } from './VariablesView';

import AreaHeader from '../components/AreaHeader';

import { getAreaList } from '../services/AreaListRequest';

import './AreaListView.css';

const LogsView = ({ areas, setAreas }: { areas: any; setAreas: any  }) => {
	const handleRequestAreaList = () => {
		console.log(myObject.token);
		getAreaList()
			.then((response) => {
				console.log(response);
				console.log('ok');
				setAreas(response.areas);
				console.log(areas);
			})
			.catch((error) => {
				console.error('error');
			});
	};
	const AreaBox = (props: {
		actionServiceLogo: string;
		actionServiceLogoName: string;
		actionTypeIcon: string;
		actionType: string;
		reactionServiceLogo: string;
		reactionServiceLogoName: string;
		reactionTypeIcon: string;
		reactionType: string;
		logs: string;
		areaId: number;
	}) => {
		return (
			<div>
				<Box marginLeft={35} marginTop={20} maxW="95%" borderWidth="5px" borderRadius="lg" overflow="hidden">
					<Stack marginTop={20} marginBottom={10} direction="row">
						<div>
							{/* <Image boxSize="90px" objectFit="cover" marginLeft={20} src={props.actionServiceLogo} /> */}
							<Text fontSize="2xl" color="tomato" marginLeft={90} whiteSpace="pre-wrap">
								Service Action
							</Text>
							<Text fontSize="xl" marginLeft={90} whiteSpace="pre-wrap">
								{props.actionServiceLogoName}
							</Text>
						</div>
						<div>
							{/* <Image boxSize="90px" objectFit="cover" marginLeft={20} src={props.actionTypeIcon} /> */}
							<Text fontSize="2xl" color="tomato" marginLeft={90} whiteSpace="pre-wrap">
								Action
							</Text>
							<Text fontSize="xl" marginLeft={90} whiteSpace="pre-wrap">
								{props.actionType}
							</Text>
						</div>
						<div>
							<Image marginLeft={20} src="pictures/arrow.png" w={400} h={100} />
						</div>
						<div>
							{/* <Image boxSize="90px" objectFit="cover" marginLeft={20} src={props.reactionServiceLogo} /> */}
							<Text fontSize="2xl" color="tomato" marginLeft={90} whiteSpace="pre-wrap">
								Service Reaction
							</Text>
							<Text fontSize="xl" marginLeft={90} whiteSpace="pre-wrap">
								{props.reactionServiceLogoName}
							</Text>
						</div>
						<div>
							{/* <Image boxSize="90px" objectFit="cover" marginLeft={20} src={props.reactionTypeIcon} /> */}
							<Text fontSize="2xl" color="tomato" marginLeft={90} whiteSpace="pre-wrap">
								Reaction
							</Text>
							<Text fontSize="xl" marginLeft={90} whiteSpace="pre-wrap">
								{props.reactionType}
							</Text>
						</div>
						<div>
							<Text fontSize="4xl" marginTop={5} marginLeft={150} whiteSpace="pre-wrap">
								Create:{'\n'}
								{props.logs}
							</Text>
						</div>
					</Stack>
				</Box>
			</div>
		);
	};

	const Areas = () => {
		const rows = [];
		for (let i = 0; i < areas.length; i++) {
			rows.push(
				<AreaBox
					actionServiceLogo="pictures/twitch_logo.png"
					actionServiceLogoName={areas[i].serviceAct}
					actionTypeIcon="pictures/stream_icon.png"
					actionType={areas[i].action}
					reactionServiceLogo="pictures/discord_logo.png"
					reactionServiceLogoName={areas[i].serviceRea}
					reactionTypeIcon="pictures/message_icon.png"
					reactionType={areas[i].reaction}
					logs={areas[i].createdAt}
					areaId={areas[i].id}
					key={i}
				/>,
			);
		}
		return (
			<div>
				{rows}
			</div>
		);
	};

	const GetList = () => {
		return <Button onClick={handleRequestAreaList}>TEST</Button>;
	};

	return (
		<div>
			<AreaHeader currentPage="logs" blackRectanglePosition={1200} />
			{/* <AreaBox
				actionServiceLogo="pictures/twitch_logo.png"
				actionServiceLogoName="Twitch"
				actionTypeIcon="pictures/stream_icon.png"
				actionType="Start Stream"
				reactionServiceLogo="pictures/discord_logo.png"
				reactionServiceLogoName="Discord"
				reactionTypeIcon="pictures/message_icon.png"
				reactionType={'Post\n"lets go live"\nchannel 8'}
				logs={'Mercredi 23 janvier\n18:06'}
			/> */}
			<Areas />
			<GetList />
		</div>
	);
};

export default LogsView;
