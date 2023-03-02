import { Box, Image, Button, Center, Text, Stack, Switch } from '@chakra-ui/react';
import AreaHeader from '../components/AreaHeader';

import './AreaListView.css';

const AreaListView = () => {
	const AreaBox = (props: {
		actionServiceLogo: string;
		actionServiceLogoName: string;
		actionTypeIcon: string;
		actionType: string;
		reactionServiceLogo: string;
		reactionServiceLogoName: string;
		reactionTypeIcon: string;
		reactionType: string;
	}) => {
		let isAreaAvailable = true;
		const setAreaStatus = () => {
			isAreaAvailable = !isAreaAvailable;
			console.log(isAreaAvailable);
			//request server to set Area status
		};
		const deleteArea = () => {
			console.log('Area Delete');
		};
		return (
			<div>
				<Box marginLeft={35} marginTop={20} maxW="95%" borderWidth="5px" borderRadius="lg" overflow="hidden">
					<Stack marginTop={20} marginBottom={10} direction="row">
						<div>
							<Image boxSize="90px" objectFit="cover" marginLeft={20} src={props.actionServiceLogo} />
							<Text fontSize="xl" marginLeft={90} whiteSpace="pre-wrap">
								{props.actionServiceLogoName}
							</Text>
						</div>
						<div>
							<Image boxSize="90px" objectFit="cover" marginLeft={20} src={props.actionTypeIcon} />
							<Text fontSize="xl" marginLeft={90} whiteSpace="pre-wrap">
								{props.actionType}
							</Text>
						</div>
						<div>
							<Image marginTop={5} marginLeft={20} src="pictures/arrow.png" w={400} h={100} />
						</div>
						<div>
							<Image boxSize="90px" objectFit="cover" marginLeft={20} src={props.reactionServiceLogo} />
							<Text fontSize="xl" marginLeft={90} whiteSpace="pre-wrap">
								{props.reactionServiceLogoName}
							</Text>
						</div>
						<div>
							<Image boxSize="90px" objectFit="cover" marginLeft={20} src={props.reactionTypeIcon} />
							<Text fontSize="xl" marginLeft={90} whiteSpace="pre-wrap">
								{props.reactionType}
							</Text>
						</div>
						<div>
							<Switch marginTop={55} id="activate Area" size="lg" marginLeft={200} defaultChecked onChange={setAreaStatus} />
						</div>
						<div>
							<Image src="pictures/trash_icon.png" boxSize="90px" marginTop={15} marginLeft={20} onClick={deleteArea} />
						</div>
					</Stack>
				</Box>
			</div>
		);
	};

	return (
		<div>
			<AreaHeader currentPage="area-list" blackRectanglePosition={300} />
			<AreaBox
				actionServiceLogo="pictures/twitch_logo.png"
				actionServiceLogoName="Twitch"
				actionTypeIcon="pictures/stream_icon.png"
				actionType="Start Stream"
				reactionServiceLogo="pictures/discord_logo.png"
				reactionServiceLogoName="Discord"
				reactionTypeIcon="pictures/message_icon.png"
				reactionType={'Post\n"lets go live"\nchannel 8'}
			/>
		</div>
	);
};

export default AreaListView;
