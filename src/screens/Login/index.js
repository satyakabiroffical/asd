import { View } from 'react-native'
import React, { useState } from 'react'
import { Box, Text, Heading, VStack, FormControl, Input, Link, Button, HStack, Center, NativeBaseProvider } from "native-base";
import { connect } from 'react-redux'
import { SigninApi } from '../../store/actions/authActions';

const Login = (props) => {

  const { SigninApi } = props

  const [postData, setPostData] = useState({
    email: "",
    password: ""
  })

  const handleChange = (name, value) => {
    setPostData({
      ...postData,
      [name]: value,
    })
  }

  return (
    <Center flex={1}>
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
            color: "warmGray.50"
          }}>
            Welcome
          </Heading>
          <Heading mt="1" _dark={{
            color: "warmGray.200"
          }} color="coolGray.600" fontWeight="medium" size="xs">
            Sign in to continue!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email ID</FormControl.Label>
              <Input
                value={postData.email}
                onChangeText={(text) => handleChange("email", text)}
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Password</FormControl.Label>
              <Input 
              type="password"
                value={postData.password}
                onChangeText={(text) => handleChange("password", text)}
              />

            </FormControl>
            <Button mt="2" colorScheme="indigo"
              onPress={() => SigninApi(postData)}
            >
              Sign in
            </Button>

          </VStack>
        </Box>
      </Center>
    </Center>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {
  SigninApi
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)