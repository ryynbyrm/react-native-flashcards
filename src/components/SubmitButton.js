import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { blue} from "../utils/colors";

export default function SubmitButton({children, onPress, style = {}}) {
    return(
        <TouchableOpacity style = {[styles.btnStyle, style]} onPress = {onPress}>
            {children}
        </TouchableOpacity>
    )   
}

const styles = StyleSheet.create({
    btnStyle: {
        height: 45,
        width:160,
        textAlign:"center",
        borderRadius:10,
        padding: 10,
        backgroundColor : blue,
        marginLeft :50,
        marginRight:50,
        marginTop :20
    }
})




