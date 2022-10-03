import React, {  useEffect } from 'react'
import { Container, Box, Text, Tab, Tabs,TabList, TabPanel, TabPanels } from "@chakra-ui/react"
import { useHistory } from 'react-router-dom';
import Login from '../Components/Authentication/Login'
import Signup from '../Components/Authentication/Signup'


const Homepage = () => {
  const history = useHistory();


    useEffect(()=>{
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        console.log(userInfo);
        if(!userInfo){
            history.push('/');
        }
    }, [history]);

  return (
    <Container maxW='xl' centerContent>
      <Box
        // d='flex'
        // justifyContent='center'
        p={3}
        bg="linear-gradient(to right, #5e5c5c , #9dc5c3)"
        w="100%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize={'4xl'} fontFamily="work sans" color="white" textAlign="center">ALAAP</Text>
      </Box>
      <Box
        bg="linear-gradient(to right, #5e5c5c , #9dc5c3)"
        w="100%"
        p={4}
        borderRadius="lg"
        borderWidth="1px"
        color="white"
      >
        <Tabs variant='soft-rounded'>
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <Signup/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  )
}

export default Homepage