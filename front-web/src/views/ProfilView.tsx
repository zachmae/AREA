import { Box, Image, Button, Center, Text, Stack, Grid, GridItem } from '@chakra-ui/react';
import { MdBuild, MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import AreaHeader from '../components/AreaHeader';

const ProfilView = () => {
	const navigate = useNavigate();
	const ProfilInfo = (props: { email: string }) => {
		const handlePassword = () => {
			console.log('PASSWORD');
		};
		const handleSignOut = () => {
			console.log('SIGN OUT');
			navigate('/');
		};
		const handleDiscordLink = () => {
			console.log('DISCORD');
		};
		return (
			<Box>
				<Stack marginLeft={100} direction="row" spacing="600px">
					<div>
						<Text fontSize="xl" marginTop={100} whiteSpace="pre-wrap">
							Profil Info:
						</Text>
						<Text fontSize="xl" marginTop={100} marginLeft={100} whiteSpace="pre-wrap">
							E-mail adress: {props.email}
						</Text>
						{/* <Text fontSize="lg" whiteSpace="pre-wrap" onClick={handlePassword} marginLeft={100} color="#B794F4">
							Change password
						</Text> */}
						<Button marginLeft={400} marginTop={300} colorScheme="red" leftIcon={<MdLogout />} onClick={handleSignOut}>
							Sign out
						</Button>
					</div>
					{/* <Stack spacing="50px">
						<Text fontSize="xl" marginTop={100} marginLeft={90} whiteSpace="pre-wrap">
							Linked services:
						</Text>
						<Stack direction="row" spacing="60px">
							<div>
								<Image boxSize="90px" objectFit="cover" marginLeft={20} src={'./pictures/discord_logo.png'} />
								<Text fontSize="xl" whiteSpace="pre-wrap" marginLeft={90}>
									Discord
								</Text>
							</div>
							<Button marginTop={100} colorScheme="blue" onClick={handleDiscordLink}>
								Link acount
							</Button>
						</Stack>
					</Stack> */}
				</Stack>
			</Box>
		);
	};
	return (
		<div>
			<AreaHeader currentPage="profil" blackRectanglePosition={1650} />
			<ProfilInfo email="test@test.com" />
		</div>
	);
};

export default ProfilView;