import React from "react"

// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Foundation from 'react-native-vector-icons/Foundation'
import { COLORS } from "../constants"

const Icons = ({name, color, size, style}) => {
    switch (name) {
        
        case 'shop':
            return <Entypo name="shop" size={size} color={color} style={style} /> 

        case 'share':
            return <MaterialCommunityIcons name="share-variant" size={size} color={color} style={style} />
            
        case 'rightArrow':
            return <MaterialCommunityIcons name="chevron-right" size={size} color={color} style={style} />

        case 'cart':
            return <MaterialCommunityIcons name="cart-outline" size={size} color={color} style={style} />

        case 'cart2':
            return <MaterialCommunityIcons name="cart" size={size} color={color} style={style} />

        case 'bell':
            return <MaterialCommunityIcons name="bell" size={size} color={color} style={style} />
                
        case 'profile':
            return <FontAwesome5 name="user-circle" size={size} color={color} style={style} />
            
        case 'favorite':
            return <MaterialIcons name="favorite-outline" size={size} color={color} style={style} />
        case 'favorite-fill':
            return <MaterialIcons name="favorite" size={size} color={color} style={style} />    
            
        case 'search':
            return <MaterialIcons name="search" size={size} color={color} style={style} />     
            
        case 'chat':
            return <MaterialIcons name="chat-bubble-outline" size={size} color={color} style={style} />
            
        case 'filter':
            return <MaterialIcons name="filter-list" size={size} color={color} style={style} />
            
        case 'sort':
            return <MaterialIcons name="sort" size={size} color={color} style={style} />
            
        case 'leftUp':
            return <Feather name="corner-left-up" size={size} color={color} style={style} />

        case 'bag':
            return <Feather name="shopping-bag" size={size} color={color} style={style} />
            
        case 'backTime':
            return <Entypo name="back-in-time" size={size} color={color} style={style} /> 

        case 'plusCircle':
            return <AntDesign name="pluscircleo" size={size} color={color} style={style} /> 

        case 'plus':
            return <AntDesign name="plus" size={size} color={color} style={style} /> 

        case 'minus':
            return <AntDesign name="minus" size={size} color={color} style={style} /> 
            
        case 'poweroff':
            return <AntDesign name="poweroff" size={size} color={color} style={style} /> 
            

        case 'minusCircle':
            return <AntDesign name="minuscircleo" size={size} color={color} style={style} /> 

        case 'map':
            return <Ionicons name="ios-location-outline" size={size} color={color} style={style} /> 

        case 'wallet':
            return <Ionicons name="ios-wallet-outline" size={size} color={color} style={style} /> 

        case 'cardList':
            return <Ionicons name="ios-clipboard-outline" size={size} color={color} style={style} />

        case 'handHeart':
            return <FontAwesome5 name="hand-holding-heart" size={size} color={color} style={style} />
            
        case 'gift':
            return <Ionicons name="ios-gift-outline" size={size} color={color} style={style} /> 

        case 'pencil':
            return <SimpleLineIcons name="pencil" size={size} color={color} style={style} /> 

        case 'back':
            return <MaterialIcons name="arrow-back" size={size} color={color} style={style} />

        case 'search':
            return <MaterialIcons name="search" size={size} color={color} style={style} />
        
        case 'rate':
            return <MaterialIcons name="rate-review" size={size} color={color} style={style} />
            
        case 'logout':
            return <Ionicons name="log-out-outline" size={size} color={color} style={style} /> 

        case 'date':
            return <Fontisto name="date" size={size} color={color} style={style} /> 
            
        case 'delete':
            return <AntDesign name="delete" size={size} color={color} style={style} />

        case 'clipboard-notes':
            return <Foundation name="clipboard-notes" size={size} color={color} style={style} />

        case 'eye':
            return <MaterialCommunityIcons name="eye" size={size} color={color} style={style} />
        
        case 'eye-off':
            return <MaterialCommunityIcons name="eye-off" size={size} color={color} style={style} />
        
        case 'bell2':
            return <Fontisto name="bell" size={size} color={color} style={style} />
            
        case 'support':
            return <MaterialIcons name="support-agent" size={size} color={color} style={style} />

        case 'category':
            return <MaterialIcons name="category" size={size} color={color} style={style} />
            
        case 'phone':
            return <FontAwesome name="phone" size={size} color={color} style={style} />
        
        case 'mail':
            return <AntDesign name="mail" size={size} color={color} style={style} />
         
        case 'cross':
            return <Entypo name="cross" size={size} color={color} style={style} />
        
        case 'truck':
            return <MaterialCommunityIcons name="truck-fast-outline" size={size} color={color} style={style} />

        case 'membership':
            return <MaterialCommunityIcons name="wallet-membership" size={size} color={color} style={style} />
        
        case 'calendar-blank':
            return <MaterialCommunityIcons name="calendar-blank-outline" size={size} color={color} style={style} />

            
        case 'offer':
            return <MaterialCommunityIcons name="offer" size={size} color={color} style={style} />

        case 'true-shield':
            return <Ionicons name="ios-shield-checkmark-outline" size={size} color={color} style={style} />

        case 'check':
            return <Feather style={style} name="check" size={size} color={color} />    
        
        case 'down':
            return <Entypo style={style} name="chevron-small-down" size={size} color={color} />    
            
        case 'priceTag':
            return <Foundation style={style} name="pricetag-multiple" size={size} color={color} />    
        default:
            return <Icon name="pencil" size={45} color="#303030" style={style} />
    }
}

Icons.defaultProps = {
    name: "pencil",
    size: 24,
    color: COLORS.primary,
    style: null
}

export default Icons