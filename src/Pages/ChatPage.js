import { Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../Components/miscelleneous/SideDrawer";
import MyChats from "../Components/miscelleneous/MyChats";
import ChatBox from "../Components/miscelleneous/ChatBox";
import { useState } from "react";
const ChatPage = () => {
    const {user} = ChatState();
    const [fetchAgain, setFetchAgain] = useState()
    

    return (
        <div style={{width: '100%'}}>
            {user && <SideDrawer/>}
            <Box
                display="flex"
                justifyContent="space-between"
                w="100%"
                h="91.5vh"
                p="10px"
            >
                {user && <MyChats fetchAgain={fetchAgain}/>}
                {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
            </Box>
        </div>
    )
}

export default ChatPage