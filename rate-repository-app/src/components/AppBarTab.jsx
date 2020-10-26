import React from 'react';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const styles = StyleSheet.create({
    container: {
      paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.colors.appBarBackground,
    },
    scrollView: {
      flexDirection: 'row',
    },
    tabTouchable: {
      flexGrow: 0,
    },
    tabContainer: {
      paddingHorizontal: 15,
      paddingVertical: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tabText: {
      color: 'white',
    },
  });

const AppBarTab = ({ children, ...props }) => {

    return (
      <TouchableWithoutFeedback style={styles.tabTouchable} {...props}>
        <View style={styles.tabContainer}>
          <Text fontWeight="bold" style={styles.tabText}>
            {children}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

export default AppBarTab;