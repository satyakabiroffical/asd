import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";
import { SIZES } from "../../constants/theme";

export default StyleSheet.create({
    base: {
        flex: 1,
        alignItems: "center"
    },  
    captureBtn: {
        backgroundColor: COLORS.gray2, 
        width: SIZES.width* .2, 
        height: SIZES.width* .2, 
        position:"absolute", 
        zIndex:5, 
        bottom: 50,
        borderRadius: 50,
        borderWidth: 8,
        borderColor: COLORS.while3
    },
    labelText: {
        color: COLORS.white
    },
    topLabelsContainer: {
        top: SIZES.height * .04,
        width: SIZES.width,
        height: SIZES.height * .1,
        // backgroundColor: COLORS.transparentBlack1,
        paddingHorizontal: 10
    },
    topSubContainer: {
        flexDirection: "row",
    },
    topChildContainer: {
        backgroundColor: COLORS.transparentBlack3,
        width: SIZES.width * .45,
        height: SIZES.height * .05,
        // alignItems: "center",
        justifyContent: "center",
        paddingLeft: SIZES.width * .05,
        marginRight: 10
    },
    captureImage: {
        
    },
    
    detailsContainer: {
        width: SIZES.width,
        height: SIZES.height * .22,
        backgroundColor: COLORS.transparentBlack3,
        top: SIZES.height * .5,
        flexDirection: "row",
        // alignItems: "center",
        flexWrap: "wrap",
        paddingVertical: 10
    },
    detailsSubContainer: {
        width: SIZES.width * .5,
        paddingLeft: 10
    },
    locationText: {
        color: COLORS.white
    },
    submitBtn: {
        width: SIZES.width * .45,
        height: SIZES.height * .07,
        backgroundColor: COLORS.primary, 
        bottom: 50,
        position:"absolute", 
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    submitBtnText: {
        color: COLORS.white,
        fontSize: 18
    },
    listText: {
        color: COLORS.black2,
        fontSize: 16,
        paddingVertical: SIZES.height *.012,
    },
    listBtn: {
        
        paddingLeft: 15,
        marginHorizontal: 10,
        marginTop: 5,
        borderRadius: 5
    }
})