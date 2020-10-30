import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import Text from '../Text';

const styles = StyleSheet.create({
    containerMain: {
        padding: 20,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    containerInfo: {
        flexDirection: 'column',
        paddingLeft: 10,
        paddingTop: 3,
        flex: 1
    },
    tinyImage: {
        width: 50,
        height: 50,
        borderRadius: 4,
    },
});

const BasicInfo = ({ avatar, fullName, description }) => {
    return (
        <View style={styles.containerMain}>
            <View>
                <Image style={styles.tinyImage} source={{
                    uri: `${avatar}`,
                }} />
            </View>
            <View style={styles.containerInfo}>
                <Text testID="fullName" fontWeight={'bold'}>{fullName}</Text>
                <Text testID="description" color={'textSecondary'}>{description}</Text>
            </View>
        </View>

    );
};

export default BasicInfo;