import { Platform } from 'react-native';

const theme = {
    colors: {
        textAppBar: '#ffffff',
        textPrimary: '#24292e',
        textSecondary: '#586069',
        textLanguage: '#ffffff',
        primary: '#0366d6',
        appBarBackGround: '#24292e',
        mainBackGround: '#e1e4e8',
        signInbackGround: '#ffffff',
        listItem: '#ffffff',
        validationError: '#d73a4a',
    },
    fontSizes: {
        body: 14,
        subheading: 16,
    },
    fonts: {
        main: Platform.select({
            android: 'Roboto',
            ios: 'Arial',
            default: 'System'
        }),
    },
    fontWeights: {
        normal: '400',
        bold: '700',
    },
};

export default theme;