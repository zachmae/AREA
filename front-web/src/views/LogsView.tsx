import { Box, Image, Button, Center, Text, Stack } from '@chakra-ui/react';
import AreaHeader from '../components/AreaHeader'

const LogsView = () => {
	return (
		<div>
			<AreaHeader currentPage="logs" blackRectanglePosition={1200}/>
		</div>
	);
};

export default LogsView;
