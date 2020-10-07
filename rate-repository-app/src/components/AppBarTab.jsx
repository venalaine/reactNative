import React from 'react';
import Text from './Text';
import { TouchableWithoutFeedback } from 'react-native';

const AppBarTab = ({ appBarText, onPress }) => {
    return (
            <TouchableWithoutFeedback onPress={onPress}>
                <Text color="textAppBar" fontSize="subheading" fontWeight="bold">{appBarText}</Text>
            </TouchableWithoutFeedback>
    );
};

export default AppBarTab;