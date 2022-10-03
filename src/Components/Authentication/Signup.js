import React, { useState } from 'react'
import { VStack } from "@chakra-ui/layout"
import { Button, useToast, FormControl, FormLabel, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import axios from 'axios';
import {useHistory} from 'react-router-dom';
const url = 'https://mern-alaap-production.up.railway.app';

function Signup() {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [pic, setPic] = useState();
    const [show, setShow] = useState(false);
    const [loading, setloading] = useState(false);
    const history = useHistory();
    const toast = useToast()

    const handleClick = () => {
        setShow(!show);
    }
    const postDetails = (pics) => {
        setloading(true);
        if(pics === undefined){
            toast({
                title: 'Please select an Image',
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });

            return;
        }

        if(pics.type === "image/jpeg" || pics.type === "image/png"){
            const data = new FormData();
            data.append('file', pics);
            data.append('upload_preset', "chat-app");
            data.append('cloud_name', "jbk");
            fetch("https://api.cloudinary.com/v1_1/jbk/image/upload", {
                method: 'post',
                body: data,
            }).then((res)=> {
                res.json()
                .then(data=>{
                    setPic(data.url.toString());
                    setloading(false);
                })
                .catch((err)=>{
                    console.log(err);
                    setloading(false);
                })
            });
        }else{
            toast({
                title: 'Please select an Image',
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom' 
            })
            setloading(false);
            return;
        }
    };

    const submitHandler = async () => {
        setloading(true);
        if(!name || !email || !password || !confirmpassword || !pic){
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
        if(password != confirmpassword){
            toast({
                title: 'Passwords do not match',
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: 'bottom'
            });
            setloading(false);
            return
        }
        try{
            const config = {
                headers:{
                    "Content-type": "application/json"
                },
            };
            const {data} = await axios.post(`${url}/api/user`,{name, email,password,pic},
            config
            );
            toast({
                title: 'Registration Successful',
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
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter Your Name'
                    onChange={(e) => setName(e.target.value)}
                    bg='white'
                    color='black'
                />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    placeholder='Enter Your Email'
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
            <FormControl id='confirmPassword' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        type={show ? "text" : "password"}
                        placeholder='Enter Your Password'
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
            <FormControl id='pic' isRequired>
                <FormLabel>Upload Your Picture</FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    onChange={(e) => postDetails(e.target.files[0])}
                    bg='white'
                    color='black'
                />
            </FormControl>
            <Button
                colorScheme='blue'
                width='100%'
                style={{ marginTop: 15}}
                onClick={submitHandler}
                isLoading={loading}
            >
                Submit
            </Button>
        </VStack>
    )
}

export default Signup