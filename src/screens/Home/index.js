import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Box, Button, Center, CheckIcon, FormControl, Select, VStack } from 'native-base'
import { launchCamera } from 'react-native-image-picker'
import { GetDistrictsApi, GetTehsilsApi, GetVillagesApi } from '../../store/actions/locationActions'
import { GetConsentDetailApi, GetConsentsApi } from '../../store/actions/consentsActions'
import styles from './styles'
import { COLORS } from '../../constants'

const plantStatus = [
  "Live", "Dead", "Healthy", "Unhealthy"
]

const Home = (props) => {

  const { GetDistrictsApi, GetTehsilsApi, GetVillagesApi,
    GetConsentsApi, GetConsentDetailApi, districts,
    tehsils, halkas, villages, consentsList, consentDetail,
    navigation } = props

  const [postData, setPostData] = useState({
    district_id: null,
    tehsil_id: null,
    village_id: null,
    consent_id: null,
    tree_id: null,
    // latitude:11111,
    // longitude:2222,
    // image: null
    // "consent_id": 27335, 
    // "district_id": 1, 
    // "tehsil_id": 4, 
    // "tree_id": "4", 
    // "village_id": 6,
    "status": null
  })

  useEffect(() => {
    if (!districts) GetDistrictsApi()
  }, [])


  const handleChange = (name, value, cb = null) => {

    if ("district_id" === name) {
      setPostData({
        ...postData,
        "tehsil_id": null,
        "village_id": null,
        "consent_id": null,
        "tree_id": null,
        "status": null,
        [name]: value
      }, console.log(postData))
    }
    else if ("tehsil_id" === name) {
      setPostData({
        ...postData,
        "village_id": null,
        "consent_id": null,
        "tree_id": null,
        "status": null,
        [name]: value,
      })
    }
    else if ("village_id" === name) {
      setPostData({
        ...postData,
        "consent_id": null,
        "tree_id": null,
        "status": null,
        [name]: value,
      })
    }
    else if ("consent_id" === name) {
      setPostData({
        ...postData,
        "tree_id": null,
        "status": null,
        [name]: value,
      })
    }
    else if ("tree_id" === name) {
      setPostData({
        ...postData,
        "status": null,
        [name]: value,
      })
    }
    else {
      setPostData({
        ...postData,
        [name]: value,

      })
    }
    cb && cb(value)
  }


  const handleCamera = () => {
    // launchCamera({
    //   width: 300,
    //   height: 400
    // }).then(image => {
    //     console.log(image)
    // })
    navigation.navigate("CameraView", postData)
  }
  console.log("districts", districts)
  return (
    <View style={styles.base} >
      <View style={styles.base} >
        <Center w="100%">
          <Box safeArea p="2" pb="8" w="95%">
            <FormControl>
              <FormControl.Label>District</FormControl.Label>
            </FormControl>
            <Select selectedValue={postData.district_id} minWidth="100%" size={20} accessibilityLabel="Select District" placeholder="Select District" _selectedItem={{
              bg: "teal.600",
              placeholder: "teal.600",
              endIcon: <CheckIcon size="5" />
            }} mt={1} onValueChange={itemValue => handleChange("district_id", itemValue, GetTehsilsApi)}>
              {districts && districts.map((item, index) => {
                return (
                  <Select.Item label={item.name} value={item.id} />
                )
              })}
            </Select>
            {tehsils && postData.district_id &&
              <VStack>
                <FormControl>
                  <FormControl.Label>Tehsil</FormControl.Label>
                </FormControl>
                <Select selectedValue={postData.tehsil_id} minWidth="100%" size={20} accessibilityLabel="Select Tehsil" placeholder="Select Tehsil" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => handleChange("tehsil_id", itemValue, GetVillagesApi)}>
                  {tehsils && tehsils.map((item, index) => {
                    return (
                      <Select.Item label={item.name} value={item.id} />
                    )
                  })}
                </Select>
              </VStack>
            }
            {/* <FormControl>
            <FormControl.Label>Halka</FormControl.Label>
        </FormControl>
        <Select selectedValue={"service"} minWidth="100%" accessibilityLabel="Select Halka" placeholder="Select Halka" _selectedItem={{
          bg: "teal.600",
          endIcon: <CheckIcon size="5" />
        }} mt={1} onValueChange={itemValue => setService(itemValue)}>
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
            <Select.Item label="Cross Platform Development" value="cross" />
            <Select.Item label="UI Designing" value="ui" />
            <Select.Item label="Backend Development" value="backend" />
        </Select> */}
            {villages && postData.tehsil_id &&
              <VStack>
                <FormControl>
                  <FormControl.Label>Village</FormControl.Label>
                </FormControl>
                <Select selectedValue={postData.village_id} minWidth="100%" size={20} accessibilityLabel="Select Village" placeholder="Select Village" _selectedItem={{
                  bg: COLORS.primary,
                  color: "muted.800",
                  // tintColor: COLORS.white,
                  endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => handleChange("village_id", itemValue, GetConsentsApi)}>
                  {villages && villages.map((item, index) => {
                    return (
                      <Select.Item label={item.name} value={item.id} />
                    )
                  })}
                </Select>
              </VStack>

            }
            {consentsList && postData.village_id &&
              <VStack>
                <FormControl>
                  <FormControl.Label>Farmer</FormControl.Label>
                </FormControl>
                <Select selectedValue={postData.consent_id} minWidth="100%" size={20} accessibilityLabel="Select Village" placeholder="Select Village" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => handleChange("consent_id", itemValue, GetConsentDetailApi)}>
                  {consentsList && consentsList.map((item, index) => {
                    return (
                      <Select.Item label={item.id + " - " + item.name_english} value={item.id} />
                    )
                  })}
                </Select>
              </VStack>
            }
            {consentDetail &&
              <VStack>
                <FormControl>
                  <FormControl.Label>Tree/Plant</FormControl.Label>
                </FormControl>
                <Select selectedValue={postData.tree_id} minWidth="100%" size={20} accessibilityLabel="Select Tree" placeholder="Select Tree" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => handleChange("tree_id", itemValue)}>
                  {consentDetail && consentDetail.plantation.map((item, index) => {
                    return (
                      <Select.Item label={item.name} value={item.id} />
                    )
                  })}
                </Select>
              </VStack>
            }
            {postData.tree_id &&
              <VStack>
                <FormControl>
                  <FormControl.Label>Tree/Plant Status</FormControl.Label>
                </FormControl>
                <Select selectedValue={postData.status} minWidth="100%" size={20} accessibilityLabel="Select Tree" placeholder="Select Tree" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => handleChange("status", itemValue)}>
                  {plantStatus.map((item, index) => {
                    return (
                      <Select.Item label={item} value={item} />
                    )
                  })}
                </Select>
              </VStack>
            }
          </Box>
        </Center>
      </View>
      <Button m="4" colorScheme={!postData.consent_id || !postData.status || !postData.tree_id ? "gray" : "indigo"}
        onPress={handleCamera} disabled={!postData.consent_id || !postData.status || !postData.tree_id}
      >
        Submit
      </Button>
    </View>
  )
}

const mapStateToProps = (state) => ({
  districts: state.location.districts,
  tehsils: state.location.tehsils,
  halkas: state.location.halkas,
  villages: state.location.villages,
  consentsList: state.consents.consentsList,
  consentDetail: state.consents.consentDetail
})

const mapDispatchToProps = {
  GetDistrictsApi,
  GetTehsilsApi,
  GetVillagesApi,
  GetConsentsApi,
  GetConsentDetailApi
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)