import { Box, Image, Button, Center, Text, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';


const AreaHeader = (props: {currentPage: string, blackRectanglePosition: number}) => {
    const navigate = useNavigate();
    const handleAreaList = () => {
        if (props.currentPage != "area-list") {
		    navigate('/area-list');
        }
	};
	const handleEditor = () => {
        if (props.currentPage != "edit") {
		    navigate('/edit');
        }
	};
	const handleLogs = () => {
        if (props.currentPage != "logs") {
		    navigate('/logs');
        }
	};
	const handleProfil = () => {
        if (props.currentPage != "profil") {
		    navigate('/profil');
        }
	};

    return (
        <div>
            <Box
                bgImage="pictures/header_banner.png"
                backgroundSize="contain"
                backgroundRepeat="no-repeat"
                h="calc(10v100h)"
                display="flex"
            >
                <div className="selectionPageButton" onClick={handleAreaList}>
                    <Image boxSize="90px" objectFit="cover" src="pictures/areas_list_icon.png" />
                    <Text fontSize="xl" marginLeft={3}>
                        AREAS
                    </Text>
                </div>
                <div className="selectionPageButton" onClick={handleEditor}>
                    <Image boxSize="90px" objectFit="cover" src="pictures/edit_icon.png" />
                    <Text fontSize="xl" marginLeft={5}>
                        EDIT
                    </Text>
                </div>
                <div className="selectionPageButton" onClick={handleLogs}>
                    <Image boxSize="90px" objectFit="cover" src="pictures/logs_icon.png" />
                    <Text fontSize="xl" marginLeft={5}>
                        LOGS
                    </Text>
                </div>
                <div className="selectionPageButton" onClick={handleProfil}>
                    <Image boxSize="90px" objectFit="cover" src="pictures/profil_icon.png" />
                    <Text fontSize="xl" marginLeft={5}>
                        Profil
                    </Text>
                </div>
            </Box>
            <Image marginLeft={props.blackRectanglePosition} objectFit="cover" src="pictures/black_rectangle.png" />
        </div>
    );
};

export default AreaHeader;