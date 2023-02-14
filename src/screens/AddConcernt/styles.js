import { Dimensions, StyleSheet } from 'react-native'
import { COLORS } from '../../constants'
const { width, height } = Dimensions.get("window")

export default StyleSheet.create({
    addconcernt_container: {
        flex: 1,
        backgroundColor: COLORS.white
    },
    input_main: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#CCCCCC"
    },
    input_main2: {
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#CCCCCC",
        position:'absolute',
        left:width*.35,
        width:width*.4
    },
    input_style: {
        paddingLeft: width * .032,
        color: COLORS.black,
        paddingVertical:height*.011
    },
    tree_main:{
        flexDirection:'row',
      height:height*.068,
      alignItems:'center'

    },
    concentform_main:{
        borderWidth: 1,
        borderRadius: 4,
        borderColor: "#CCCCCC",
        height:height*.2,
        alignItems:'center',
        justifyContent:'center'
    },
    download_icon:{
        width:width*.16,
        height:height*.08
    },
    imgpick:{
        width:width*.36,
        height:height*.18,
        // backgroundColor:COLORS.black
    },
    bottombtn_touch:{
        backgroundColor:COLORS.blue,
        width:width*.9,
        height:height*.07,
        borderRadius:7,
        alignItems:'center',
        justifyContent:'center',
        marginTop:height*.012
    },
    bootom_btn_text:{
        color:COLORS.white,
        fontSize:18,
        fontWeight:'600'
    }
})