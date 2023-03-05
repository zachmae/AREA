import { Box, Image, Button, Center, Text, Stack, Switch } from '@chakra-ui/react';
import AreaHeader from '../components/AreaHeader';

import { myObject } from './VariablesView';

import { setAreaAvailable, setAreaDisable, deleteAreaRequest } from '../services/AreaAvaibility';

import { getAreaList } from '../services/AreaListRequest';

import './AreaListView.css';

const AreaListView = ({ areas, setAreas }: { areas: any; setAreas: any }) => {
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
		isAreaAvailable: boolean;
		areaId: number;
	}) => {
		const areaId = props.areaId;
		let isAreaAvailable = props.isAreaAvailable;
		const setAreaStatus = () => {
			isAreaAvailable = !isAreaAvailable;
			console.log(isAreaAvailable);
			if (isAreaAvailable) {
				setAreaAvailable({ areaId: areaId });
			} else {
				setAreaDisable({ areaId: areaId });
			}
			//request server to set Area status
		};
		const deleteArea = () => {
			deleteAreaRequest({ areaId: areaId });
			console.log('Area Delete');
			handleRequestAreaList();
		};
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
							<Switch
								id="activate Area"
								size="lg"
								marginTop={5}
								marginLeft={50}
								defaultChecked={isAreaAvailable}
								onChange={setAreaStatus}
							/>
						</div>
						<div>
							<Image src="pictures/trash_icon.png" boxSize="90px" marginLeft={20} onClick={deleteArea} />
						</div>
					</Stack>
				</Box>
			</div>
		);
	};

	const Areas = () => {
		const rows = [];
		// handleRequestAreaList();
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
					areaId={areas[i].id}
					isAreaAvailable={areas[i].active}
					key={i}
				/>,
			);
		}
		return (
			<div>
				{rows}
				{/* {myObject.areas.map((area) => {
					<AreaBox
						actionServiceLogo="pictures/twitch_logo.png"
						actionServiceLogoName="Twitch"
						actionTypeIcon="pictures/stream_icon.png"
						actionType="Start Stream"
						reactionServiceLogo="pictures/discord_logo.png"
						reactionServiceLogoName="Discord"
						reactionTypeIcon="pictures/message_icon.png"
						reactionType={'Post\n"lets go live"\nchannel 8'}
					/>;
				})} */}
			</div>
		);
	};

	const GetList = () => {
		return <Button onClick={handleRequestAreaList}>TEST</Button>;
	};

	return (
		<div>
			<AreaHeader currentPage="area-list" blackRectanglePosition={300} />
			<Areas />
			{/* <AreaBox
				actionServiceLogo="pictures/twitch_logo.png"
				actionServiceLogoName="Twitch"
				actionTypeIcon="pictures/stream_icon.png"
				actionType="Start Stream"
				reactionServiceLogo="pictures/discord_logo.png"
				reactionServiceLogoName="Discord"
				reactionTypeIcon="pictures/message_icon.png"
				reactionType={'Post\n"lets go live"\nchannel 8'}
			/> */}
			{/* <Text fontSize="xl" marginLeft={90} whiteSpace="pre-wrap">{myObject.token} {myObject.email}</Text> */}
			<GetList />
		</div>
	);
};

export default AreaListView;
