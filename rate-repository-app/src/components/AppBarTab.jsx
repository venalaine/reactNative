import React from 'react';
import Text from './Text';
import { TouchableOpacity } from 'react-native';
import { Link } from 'react-router-native';

const AppBarTab = ({ appBarText, linkUrl }) => {
    return (
        <Link to={linkUrl} component={TouchableOpacity} activeOpacity={0.8} >
            <Text color="textAppBar" fontSize="subheading" fontWeight="bold">{appBarText}</Text>
        </Link>
    );
};

export default AppBarTab;