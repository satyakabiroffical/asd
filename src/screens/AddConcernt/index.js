import React, { useEffect, useState } from 'react'
import { View, Text, Dimensions, TouchableOpacity, Image, TextInput, ScrollView } from 'react-native'
import { COLORS } from '../../constants'
import styles from './styles'
import { Box, Button, Center, CheckIcon, FormControl, Select, VStack, Actionsheet } from 'native-base'
import { connect } from 'react-redux'
import { AddConcentApi, GetAllTreeApi, GetDistrictsApi, GetHalkasApi, GetTehsilsApi, GetVillagesApi, GetVistarakApi } from '../../store/actions/locationActions'
import ImagePicker from 'react-native-image-crop-picker';
import { RNToasty } from 'react-native-toasty'
import DatePicker from 'react-native-date-picker';
const { width, height } = Dimensions.get('window')
import { formattedDateServer } from '../../utils/date'
const AddConcernt = ({ navigation, GetDistrictsApi, GetTehsilsApi, GetVillagesApi, treedata, districts, tehsils, villages, GetHalkasApi, halkas, GetVistarakApi, vistarak, GetAllTreeApi, AddConcentApi }) => {
    useEffect(() => {
        GetAllTreeApi()
    }, [])
    const [img, setImg] = useState()
    const [imagePick, setImagePick] = useState(null)
    const [imagePick1, setImagePick1] = useState(null)
    const [firstImg, setFirstImg] = useState()
    const [firstImg2, setFirstImg2] = useState()
    const [treeArray, setTreeArray] = useState([])
    const [bottomsheetPick, setBottomsheetPick] = useState(false)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [picCon, setPicCon] = useState('')
    const [postData, setPostData] = useState({
        district_id: null,
        tehsil_id: null,
        village_id: null,
        consent_id: null,
        tree_id: null,
        halka_id: null,
        vistarak_id: null,
        remark: '',
        prerakName: '',
        prerakPhone: '',
        fatherNameHi: "",
        fatherNameEn: "",
        khesraNo: "",
        phone: "",
        rakba: "",
        dateofConcent: "",
        "status": null
    })

    useEffect(() => {
        if (treedata != null) {
            let arr = new Array(treedata.length).fill("0")
            setTreeArray(arr)
        }
    }, [treedata])

    const handleArrayChange = (index, value) => {
        let arr = [...treeArray]
        arr[index] = value
        setTreeArray(arr)
    }

    const bottomSheetPickPress = () => {
        setBottomsheetPick(!bottomsheetPick)
    }


    const handleChange = (name, value, cb = null) => {


        if ("district_id" === name) {
            setPostData({
                ...postData,
                "tehsil_id": null,
                "village_id": null,
                "consent_id": null,
                "tree_id": null,
                "status": null,
                // "halka_id": null,
                ' vistarak_id': null,
                [name]: value
            }, console.log(postData))
        }
        else if ("tehsil_id" === name) {
            setPostData({
                ...postData,
                "village_id": null,
                "consent_id": null,
                "tree_id": null,
                // "halka_id": null,
                "status": null,
                ' vistarak_id': null,
                [name]: value,
            })
        }
        else if ("village_id" === name) {
            setPostData({
                ...postData,
                "consent_id": null,
                "tree_id": null,

                "status": null,
                ' vistarak_id': null,
                [name]: value,
            })
        }
        else if ("halka_id" === name) {
            setPostData({
                ...postData,
                "consent_id": null,
                "tree_id": null,
                ' vistarak_id': null,
                "status": null,
                [name]: value,
            })
        }
        else if ("vistarak_id" === name) {
            setPostData({
                ...postData,
                "consent_id": null,



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

    const ImagePick = (condition) => {
        console.log("sad")
        if (condition.picMethod === "camera") {

            ImagePicker.openCamera({
                width: 300,
                height: 300,
                cropping: false

            }).then(image => {
                console.log("mine", image);
                setImg(image.path)
                setFirstImg(image.path)
                setImagePick({
                    uri: image.path,
                    name: `${Date.now()}.jpeg`,
                    type: image.mime
                })
            });
        } else {
            ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: false

            }).then(image => {
                console.log("mine", image);
                setImg(image.path)
                setFirstImg(image.path)
                setImagePick({
                    uri: image.path,
                    name:`${Date.now()}.jpeg`,
                    type: image.mime
                })
            });
        }
    }
    const ImagePick2 = (condition) => {
        if (condition.picMethod === "camera") {
            ImagePicker.openCamera({
                width: 300,
                height: 300,
                cropping: true,
                // useFrontCamera: true,

            }).then(image => {
                console.log("mine", image);
                setImg(image.path)
                setFirstImg2(image.path)
                setImagePick1({
                    uri: image.path,
                    name: `${Date.now()}.jpeg`,
                    type: image.mime
                })
            });
        } else {
            ImagePicker.openPicker({
                width: 300,
                height: 300,
                cropping: true,
                // useFrontCamera: true,

            }).then(image => {
                console.log("mine", image);
                setImg(image.path)
                setFirstImg2(image.path)
                setImagePick1({
                    uri: image.path,
                    name: `${Date.now()}.jpeg`,
                    type: image.mime
                })
            });
        }
    }
  


    const submitPress = () => {
        var formData = new FormData()
        formData.append('district_id', postData.district_id)
        formData.append('tehsil_id', postData.tehsil_id)
        formData.append('village_id', postData.village_id)
        formData.append('halka_id', postData.halka_id)
        formData.append('vistarak_id', postData.vistarak_id)
        formData.append('name_hindi', postData.fatherNameHi)
        formData.append('name_english', postData.fatherNameEn)
        formData.append('phone', postData.phone)
        formData.append('remark', postData.remark)
        formData.append('khasra_no', postData.khesraNo)
        formData.append('prerak_name', postData.prerakName)
        formData.append('prerak_phone', postData.prerakPhone)
        formData.append('date_consent', postData.dateofConcent)
        formData.append('rakba', postData.rakba)
        // formData.append('consent_form', postData.rakba)
        formData.append('requested', JSON.stringify(treeArray))
        // formData.append('farmer_photo', postData.rakba)
        if (imagePick) {
            formData.append('consent_form', imagePick)
        }
        if (imagePick1) {
            formData.append('farmer_photo', imagePick1)
        }

        if (postData.district_id) {
            AddConcentApi(formData, navigation)

        } else {
            RNToasty.Error({
                title: "Fill all field"
            })
        }
    }

    useEffect(() => {
        if (halkas) {
            handleChange("halka_id", halkas.id)
        }
    }, [halkas])


    return (
        <View style={styles.addconcernt_container}>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                                }} mt={1} onValueChange={itemValue => handleChange("tehsil_id", itemValue, () => { GetVillagesApi(itemValue), GetVistarakApi(itemValue) })}>
                                    {tehsils && tehsils.map((item, index) => {
                                        return (
                                            <Select.Item label={item.name} value={item.id} />
                                        )
                                    })}
                                </Select>
                            </VStack>
                        }

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
                                }} mt={1} onValueChange={itemValue => handleChange("village_id", itemValue, GetHalkasApi)}>
                                    {villages && villages.map((item, index) => {
                                        return (
                                            <Select.Item label={item.name} value={item.id} />
                                        )
                                    })}
                                </Select>
                            </VStack>
                        }
                        {halkas && postData.village_id &&
                            <VStack>
                                <FormControl>
                                    <FormControl.Label>Halka Name</FormControl.Label>
                                </FormControl>
                                <View style={styles.input_main}>
                                    <TextInput
                                        value={halkas.name}
                                        placeholder='Halka Name'
                                        style={styles.input_style}
                                        editable={false}
                                        placeholderTextColor={COLORS.gray2}
                                    // onChangeText={()=>handleChange('halka_id',halkas.id)}
                                    />
                                </View>
                            </VStack>
                        }
                        {vistarak && postData.village_id &&
                            <VStack>
                                <FormControl>
                                    <FormControl.Label>Vistarak Name</FormControl.Label>
                                </FormControl>
                                <Select selectedValue={postData.vistarak_id} minWidth="100%" size={20} accessibilityLabel="Select Vistarak" placeholder="Select Vistarak" _selectedItem={{
                                    bg: COLORS.primary,
                                    color: "muted.800",
                                    // tintColor: COLORS.white,
                                    endIcon: <CheckIcon size="5" />
                                }} mt={1} onValueChange={itemValue => handleChange("vistarak_id", itemValue,)}>
                                    {vistarak && vistarak.map((item, index) => {
                                        return (
                                            <Select.Item label={item.name} value={item.id} />
                                        )
                                    })}
                                </Select>
                            </VStack>
                        }
                       

                        <FormControl>
                            <FormControl.Label>Farmer/Father Name (Hindi)</FormControl.Label>
                        </FormControl>
                        <View style={styles.input_main}>
                            <TextInput
                                placeholder='Name Hindi Here'
                                style={styles.input_style}
                                value={postData.fatherNameHi}
                                onChangeText={(text) => handleChange('fatherNameHi', text)}
                                placeholderTextColor={COLORS.gray30}
                            />
                        </View>

                        <FormControl>
                            <FormControl.Label>Farmer/Father Name (English)</FormControl.Label>
                        </FormControl>
                        <View style={styles.input_main}>
                            <TextInput
                                placeholder='Name English Here'
                                style={styles.input_style}
                                value={postData.fatherNameEn}
                                onChangeText={(text) => handleChange('fatherNameEn', text)}
                                placeholderTextColor={COLORS.gray30}
                            />
                        </View>

                        <FormControl>
                            <FormControl.Label>Khasra No</FormControl.Label>
                        </FormControl>
                        <View style={styles.input_main}>
                            <TextInput
                                placeholder='Khasra No Here'
                                style={styles.input_style}
                                value={postData.khesraNo}
                                onChangeText={(text) => handleChange('khesraNo', text)}
                                // keyboardType='numeric'
                                placeholderTextColor={COLORS.gray30}

                            />
                        </View>
                        <FormControl>
                            <FormControl.Label>Phone</FormControl.Label>
                        </FormControl>
                        <View style={styles.input_main}>
                            <TextInput
                                placeholder='Phone Here'
                                style={styles.input_style}
                                value={postData.phone}
                                onChangeText={(text) => handleChange('phone', text)}
                                keyboardType='numeric'
                                maxLength={10}
                                placeholderTextColor={COLORS.gray30}
                            />
                        </View>
                        <FormControl>
                            <FormControl.Label>Rakba</FormControl.Label>
                        </FormControl>
                        <View style={styles.input_main}>
                            <TextInput
                                placeholder='Rakba Here'
                                style={styles.input_style}
                                value={postData.rakba}
                                onChangeText={(text) => handleChange('rakba', text)}
                                keyboardType='numeric'
                                placeholderTextColor={COLORS.gray30}
                            />
                        </View>
                        <FormControl>
                            <FormControl.Label>Date of consent</FormControl.Label>
                        </FormControl>
                        <View style={styles.input_main}>
                            <TextInput
                                placeholder='yyyy-mm-dd'
                                style={styles.input_style}
                                value={postData.dateofConcent}
                                onChangeText={(text) => handleChange('dateofConcent', text)}
                                onPressIn={() => setOpen(true)}
                                placeholderTextColor={COLORS.gray30}
                            />
                        </View>
                        <View style={{ marginTop: height * .02 }}>
                            {treedata && treedata.map((item, index) => (
                                <View style={styles.tree_main}>
                                    <FormControl>
                                        <FormControl.Label>{item.name}</FormControl.Label>
                                    </FormControl>
                                    <View style={styles.input_main2}>
                                        <TextInput
                                            placeholder='0'
                                            style={styles.input_style}
                                            keyboardType={'numeric'}
                                            value={treeArray[index]}
                                            onChangeText={(text) => handleArrayChange(index, text)}
                                            placeholderTextColor={COLORS.gray30}
                                        />
                                    </View>
                                </View>
                            ))}
                        </View>
                        <FormControl style={{ marginTop: height * .02 }}>
                            <FormControl.Label>Concent Form</FormControl.Label>
                        </FormControl>
                        <TouchableOpacity style={styles.concentform_main}
                            onPress={() => { bottomSheetPickPress(), setPicCon("concentForm") }}
                        >
                            {firstImg === undefined ?
                                <>
                                    <Image source={require('../../assets/icons/download.png')}
                                        style={styles.download_icon}
                                        resizeMode='contain'
                                    />
                                    <Text style={{ color: COLORS.black }}>Upload concent form</Text>
                                </>
                                :
                                <>
                                    <Image source={{ uri: firstImg }}

                                        style={styles.imgpick}
                                        resizeMode='contain'
                                    />
                                    {/* <Text style={{ color: COLORS.black }}>Upload concent form</Text> */}
                                </>
                            }
                        </TouchableOpacity>
                        <FormControl style={{ marginTop: height * .02 }}>
                            <FormControl.Label>Farmer Photo</FormControl.Label>
                        </FormControl>
                        <TouchableOpacity style={styles.concentform_main}
                            onPress={() => { bottomSheetPickPress(), setPicCon("farmerPhoto") }}
                        >
                            {firstImg2 === undefined ?
                                <>
                                    <Image source={require('../../assets/icons/download.png')}
                                        style={styles.download_icon}
                                        resizeMode='contain'
                                    />
                                    <Text style={{ color: COLORS.black }}>Upload Farmer Photo</Text>
                                </>
                                :
                                <>
                                    <Image source={{ uri: firstImg2 }}

                                        style={styles.imgpick}
                                        resizeMode='contain'
                                    />
                                    {/* <Text style={{ color: COLORS.black }}>Upload concent form</Text> */}
                                </>
                            }
                        </TouchableOpacity>
                      
                        <FormControl mt={'5'}>
                            <FormControl.Label>Prerak Name</FormControl.Label>
                        </FormControl>
                        <View style={styles.input_main}>
                            <TextInput
                                placeholder='Prerak Name Here (optional)'
                                style={styles.input_style}
                                value={postData.prerakName}
                                onChangeText={(text) => handleChange('prerakName', text)}
                                placeholderTextColor={COLORS.gray30}
                            />
                        </View>
                        <FormControl>
                            <FormControl.Label>Prerak Phone</FormControl.Label>
                        </FormControl>
                        <View style={styles.input_main}>
                            <TextInput
                                placeholder='Prerak Phone Here (optional)'
                                style={styles.input_style}
                                value={postData.prerakPhone}
                                onChangeText={(text) => handleChange('prerakPhone', text)}
                                keyboardType={"phone-pad"}
                                maxLength={10}
                                placeholderTextColor={COLORS.gray30}
                            />
                        </View>
                        <FormControl>
                            <FormControl.Label>Remark</FormControl.Label>
                        </FormControl>
                        <View style={styles.input_main}>
                            <TextInput
                                placeholder='Remark (optional)'
                                style={styles.input_style}
                                value={postData.remark}
                                onChangeText={(text) => handleChange('remark', text)}
                                placeholderTextColor={COLORS.gray30}
                            />
                        </View>

                        <Button m="0" mt={'5'} bg={COLORS.primary}
                            onPress={submitPress}
                        >
                            Submit
                        </Button>
                    </Box>
                </Center>
            </ScrollView>
            <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(date) => {
                    setOpen(false)
                    handleChange("dateofConcent", formattedDateServer(date))
                }}
                onCancel={() => {
                    setOpen(false)
                }}
            />
            <Actionsheet isOpen={bottomsheetPick} onClose={bottomSheetPickPress}  >
                <Actionsheet.Content>
                    <TouchableOpacity style={styles.bottombtn_touch}
                        onPress={() => { picCon === 'concentForm' ? ImagePick({ picMethod: "camera" }) : ImagePick2({ picMethod: "camera" }), bottomSheetPickPress() }}
                    >
                        <Text style={styles.bootom_btn_text}>Camera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottombtn_touch}
                        onPress={() => { picCon === 'concentForm' ? ImagePick({ picMethod: "gallery" }) : ImagePick2({ picMethod: "gallery" }), bottomSheetPickPress()  }}
                    >
                        <Text style={styles.bootom_btn_text}>Gallery</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottombtn_touch}
                        onPress={bottomSheetPickPress}
                    >
                        <Text style={styles.bootom_btn_text}>Cancel</Text>
                    </TouchableOpacity>
                </Actionsheet.Content>
            </Actionsheet>
        </View>
    )
}

const mapStateToProps = (state) => ({
    districts: state.location.districts,
    tehsils: state.location.tehsils,
    halkas: state.location.halkas,
    villages: state.location.villages,
    vistarak: state.location.vistarak,
    treedata: state.location.treedata,
    // consentsList: state.consents.consentsList,
    // consentDetail: state.consents.consentDetail
})

const mapDispatchToProps = {
    GetDistrictsApi,
    GetTehsilsApi,
    GetVillagesApi,
    GetHalkasApi,
    GetVistarakApi,
    GetAllTreeApi,
    AddConcentApi
    // GetConsentsApi,
    // GetConsentDetailApi
}
export default connect(mapStateToProps, mapDispatchToProps)(AddConcernt)
