import React from "react";
import { Text, View, StyleSheet } from "react-native";


export default function CourseRow({ code, title, seats }) {
    return (<View style={styles.row}>

        <Text style={styles.code}>{code}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text>Seats: {seats}</Text>
    </View>
    );
}

const styles = StyleSheet.create({
    row: {
        backgroundColor: "white",
        padding: 15,
    },
    code: {
        fontSize: 16,
        marginVertical: 5,
    },
    title:{
        fontSize:25,
    }

})