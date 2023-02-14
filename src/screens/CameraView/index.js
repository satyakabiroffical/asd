import { View, Text, StyleSheet, TouchableOpacity, Image, PermissionsAndroid } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Camera, useCameraDevices } from 'react-native-vision-camera'
import Loader from '../../components/loader'
import { COLORS } from '../../constants'
import styles from './styles'
import { SIZES } from '../../constants/theme'
import { captureRef, captureScreen } from 'react-native-view-shot'
// import Geolocation from 'react-native-geolocation-service';
import { Modal, Button, Input, VStack, FormControl, Center } from "native-base";

import { formattedDate, formattedTime } from '../../utils/date'
import { AddPlantationDataApi, GetConsentDetailApi } from '../../store/actions/consentsActions'
import objectToFormData from '../../utils/objectToFormData'
import Geolocation from '@react-native-community/geolocation'
import { GetCurrentAddress } from '../../store/actions/locationActions'

import Geocoder from 'react-native-geocoder';


const plantStatus = [
    "Live", "Dead", "Healthy", "Unhealthy"
]
const CameraView = (props) => {
    const { GetConsentDetailApi, GetCurrentAddress, consentDetail, AddPlantationDataApi, navigation, route } = props
    const [modalVisible, setModalVisible] = useState(false);
    const [statusModal, setStatusModal] = useState(false);

    const [postData, setPostData] = useState(route.params)

    const [currentImage, setCurrentImage] = useState(null)
    const [location, setLocation] = useState(false);
    const [rmLater, setRmLater] = useState(null)
    const [hideSubmit, setHideSubmit] = useState(false)
    const [watchId, setWatchId] = useState(null)
    const [postLocation, setPostLocation] = useState(null)
    const [address, setAddress] = useState(null)

    let cameraRef = useRef()

    const devices = useCameraDevices()
    const device = devices.back

    useEffect(() => {
        // Geolocation.clearWatch()
        permissionsFunction()
        // GetConsentDetailApi(postData.consent_id)
    }, [])

    useEffect(() => {
        // Position Geocoding
        return () => {
            Geolocation.clearWatch(watchId)
        }
    }, [])



    useEffect(() => {
        // if(address === null && location){
        //     GetCurrentAddress(location.latitude, location.longitude, (data) => setAddress(data))
        // }
        if (location) {
            let NY = {
                lat: location.latitude,
                lng: location.longitude
            };

            Geocoder.geocodePosition(NY).then(res => {
                // console.log("res",res)
                setAddress(res[0].formattedAddress)
                // res is an Array of geocoding object (see below)
            })
                .catch(err => console.log(err))
        }
    }, [location])

    const onCapture = async () => {
        const photo = await cameraRef.current.takePhoto({
            quality: 100,
            skipMetadata: true
        })
        setPostLocation(location)
        setCurrentImage(photo)
    }

    let savedPhoto = useRef(null)
    const savePhoto = async () => {

        setHideSubmit(true, (
            captureScreen({
                quality: 1,
                format: "jpg",
            })
                .then((res) => {
                    console.log("asd", res)
                    let tempPhoto = {
                        uri: res,
                        name: `${Date.now()}.jpg`,
                        type: "image/jpg"
                    }
                    handleSubmit(tempPhoto)
                    setRmLater(res)
                })
        ))
        // console.log(photo)
    }
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Geolocation Permission',
                    message: 'Can we access your location?',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === 'granted') {
                console.log('You can use Geolocation');
                return true;
            } else {
                console.log('You cannot use Geolocation');
                return false;
            }
        } catch (err) {
            return false;
        }
    };
    const permissionsFunction = async () => {
        const cameraPermission = await Camera.getCameraPermissionStatus()
        if (cameraPermission === "denied") {
            const newCameraPermission = await Camera.requestCameraPermission()
        }
        const result = requestLocationPermission();
        result.then((res) => {
            if (res) {
                let sd = Geolocation.watchPosition(
                    position => {
                        console.log("position", location);
                        setLocation(position.coords);
                        // setWatchId(JSON.stringify(position))
                    },
                    error => {

                        // See error code charts below.
                        console.log(error.code, error.message);
                        setLocation(false);
                    },
                    { enableHighAccuracy: true, distanceFilter: 0, interval: 1000, fastestInterval: 1000, timeout: 20000 },
                );
                console.log("sd", sd)
                setWatchId(sd)

            }
            console.log("cameraPermission", result)
        })

    }

    const handleSubmit = (photo) => {
        let form = objectToFormData(postData)
        form.append("image", photo)
        form.append("latitude", location.latitude)
        form.append("longitude", location.longitude)
        console.log(form)
        AddPlantationDataApi(form, navigation)
    }

    const handleChange = (name, value, cb = null) => {
        setPostData({
            ...postData,
            [name]: value,
        })
        cb && cb()
    }

    const TopBar = ({ modalDisable = false }) => {
        return (
            <View style={styles.topLabelsContainer}>
                <View style={styles.topSubContainer}>
                    <View>
                        <Text style={styles.labelText}>Status</Text>
                        <TouchableOpacity style={styles.topChildContainer} disabled={statusModal} activeOpacity={0.7}
                            onPress={() => setStatusModal(true)}
                        >
                            <Text style={styles.labelText}>{postData.status || "NA"}</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Text style={styles.labelText}>Sapling</Text>
                        <TouchableOpacity style={styles.topChildContainer} disabled={modalDisable} activeOpacity={0.7}
                            onPress={() => setModalVisible(true)}
                        >
                            <Text>{consentDetail.plantation.find(x => x.id === postData.tree_id).name}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.topSubContainer}>
                    <View>
                        <Text style={styles.labelText}>Farmer</Text>
                        <View style={[styles.topChildContainer, { width: SIZES.width * .93 }]}>
                            <Text style={styles.labelText}>{consentDetail.farmer_id ? consentDetail.farmer_id : (consentDetail.id) + " - " + consentDetail.name_english}</Text>
                        </View>
                    </View>
                </View>
                <View>
                </View>
            </View>
        )
    }


    return (
        <View style={styles.base}>
            {device == null || !location || !address ?
                <Loader />
                :
                currentImage || rmLater ?
                    <View ref={savedPhoto} style={{ flex: 1, position: "relative", width: SIZES.width }} >

                        <Image resizeMode={"cover"} source={{ uri: rmLater ? rmLater : "file:///" + currentImage.path }} style={StyleSheet.absoluteFill} />
                        <TopBar modalDisable={true} />
                        <View style={styles.detailsContainer}>
                            <View style={styles.detailsSubContainer}>
                                <Text style={styles.locationText}>Latitude: {postLocation.latitude}</Text>
                                <Text style={styles.locationText}>Longitude: {postLocation.longitude}</Text>
                                <Text style={styles.locationText}>Accuracy: {postLocation.accuracy && postLocation.accuracy.toFixed(3)} m</Text>
                                <Text style={styles.locationText}>Date: {formattedDate()}</Text>
                                {/* <Text style={styles.locationText}>Time: {formattedTime()}</Text> */}
                            </View>
                            <View style={styles.detailsSubContainer}>
                                <Text style={styles.locationText}>District: {consentDetail.district_name}</Text>
                                <Text style={styles.locationText}>Tehsil: {consentDetail.tehsil_name}</Text>
                                <Text style={styles.locationText}>Halka: {consentDetail.halka_name}</Text>
                                <Text style={styles.locationText}>Village: {consentDetail.village_name}</Text>
                                {/* <Text style={styles.locationText}>Time: {formattedTime()}</Text> */}
                            </View>
                            <View style={[styles.detailsSubContainer, { width: SIZES.width, marginTop: 10 }]}>
                                <Text style={[styles.locationText, { width: SIZES.width * .95 }]}>Address: {address}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={[styles.submitBtn, hideSubmit && { display: "none" }]}
                            onPress={() => savePhoto()}
                        >
                            <Text style={styles.submitBtnText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <>

                        <Camera
                            ref={cameraRef}
                            style={StyleSheet.absoluteFill}
                            device={device}
                            isActive={true}
                            photo={true}
                        />
                        <TopBar />
                        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="center" bottom="4" size="lg">
                            <Modal.Content pb={5}>
                                <Modal.CloseButton />
                                <Modal.Header mb={2}>Sapling</Modal.Header>
                                {consentDetail.plantation.map((item, index) => {
                                    return <TouchableOpacity style={[styles.listBtn, item.id == postData.tree_id && { backgroundColor: COLORS.primary }]} disabled={item.id == postData.tree_id}
                                        onPress={() => handleChange("tree_id", item.id, () => setModalVisible(false))}
                                    >
                                        <Text style={[styles.listText, item.id == postData.tree_id && { color: COLORS.white }]}>{item.name}</Text>
                                    </TouchableOpacity>
                                })}
                            </Modal.Content>
                        </Modal>
                        <Modal isOpen={statusModal} onClose={() => setStatusModal(false)} avoidKeyboard justifyContent="center" bottom="4" size="lg">
                            <Modal.Content pb={5}>
                                <Modal.CloseButton />
                                <Modal.Header mb={2}>Status</Modal.Header>
                                {plantStatus.map((item, index) => {
                                    return <TouchableOpacity style={[styles.listBtn, item == postData.status && { backgroundColor: COLORS.primary }]} disabled={item == postData.status}
                                        onPress={() => handleChange("status", item, () => setStatusModal(false))}
                                    >
                                        <Text style={[styles.listText, item == postData.status && { color: COLORS.white }]}>{item}</Text>
                                    </TouchableOpacity>
                                })}
                            </Modal.Content>
                        </Modal>
                        <View style={styles.detailsContainer}>
                            <View style={styles.detailsSubContainer}>
                                <Text style={styles.locationText}>Latitude: {location.latitude}</Text>
                                <Text style={styles.locationText}>Longitude: {location.longitude}</Text>
                                <Text style={styles.locationText}>Accuracy: {location.accuracy && location.accuracy.toFixed(3)} m</Text>
                                <Text style={styles.locationText}>Date: {formattedDate()}</Text>
                                <Text style={styles.locationText}>Time: {formattedTime()}</Text>
                            </View>
                            <View style={styles.detailsSubContainer}>
                                <Text style={styles.locationText}>District: {consentDetail.district_name}</Text>
                                <Text style={styles.locationText}>Tehsil: {consentDetail.tehsil_name}</Text>
                                <Text style={styles.locationText}>Halka: {consentDetail.halka_name}</Text>
                                <Text style={styles.locationText}>Village: {consentDetail.village_name}</Text>
                                {/* <Text style={styles.locationText}>Time: {formattedTime()}</Text> */}
                            </View>
                            <View style={[styles.detailsSubContainer, { width: SIZES.width, marginTop: 10 }]}>
                                <Text style={[styles.locationText, { width: SIZES.width * .95 }]}>Address: {address}</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={[styles.captureBtn]} disabled={!location ? true : false}
                            onPress={() => onCapture()}
                        >
                            {/* <View style={styles.captureBtn}/> */}
                        </TouchableOpacity>
                    </>
            }
        </View>
    )
}

const mapStateToProps = (state) => ({
    consentDetail: state.consents.consentDetail
})

const mapDispatchToProps = {
    GetConsentDetailApi,
    AddPlantationDataApi,
    GetCurrentAddress
}

export default connect(mapStateToProps, mapDispatchToProps)(CameraView)