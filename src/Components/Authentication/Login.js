import React, { useState } from 'react'
import { VStack } from "@chakra-ui/layout"
import { Button, useToast, FormControl, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import axios from 'axios';
import {useHistory} from 'react-router-dom';

function Login() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [show, setShow] = useState(false);
  const [loading, setloading] = useState(false);
  const history = useHistory();
  const toast = useToast();
  const url = 'https://mern-alaap-production.up.railway.app';



  const handleClick = () => {
    setShow(!show);
  }
  const postDetails = (pics) => {

  }

  const submitHandler = async () => {
    setloading(true);
    if(!email || !password ){
        toast({
            title: 'Please Fill all the fields',
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: 'bottom'
        });
        setloading(false);
        return;
    }
  
    try{
        const config = {
            headers:{
                "Content-type": "application/json"
            },
        };
        const {data} = await axios.post(`${url}/api/user/login`,{email,password},
        config
        );
        toast({
            title: 'Login Successful',
            status: "success",
            duration: 5000,
            isClosable: true,
            position: 'bottom'
        });

        localStorage.setItem('userInfo',JSON.stringify(data));
        setloading(false);
        history.push('/chats');
    }catch(error){
        toast({
            title: 'Error occured',
            description: error.response.data.message,
            status: "warning",
            duration: 5000,
            isClosable: true,
            position: 'bottom'
        });
        setloading(false);
    }
}
  return (
    <VStack spacing='5px'>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter Your Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          bg='white'
          color='black'
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder='Enter Your Password'
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            bg='white'
            color='black'
          />
          <InputRightElement>
            <Button h='1.75rem' size='sm' bg="white" padding="3px" marginRight="5px" color='black'
              _hover={{
                background: "white",
                color: "black",
              }}
              onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>

      </FormControl>

      <Button
        colorScheme='blue'
        width='100%'
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
      <Button
        colorScheme='red'
        width='100%'
        style={{ marginTop: 15 }}
        onClick={()=>{
          setEmail("guest@example.com");
          setPassword("12345");
        }}
        isLoading={loading}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  )
}

export default Login
