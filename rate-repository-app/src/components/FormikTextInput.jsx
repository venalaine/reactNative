import React from 'react';
import { StyleSheet } from 'react-native';
import { useField } from 'formik';

import TextInput from './TextInput';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.validationError,
  },
  textInputStyle: {
    padding: 15,
    backgroundColor: 'white',
    borderColor: theme.colors.textSecondary,
    borderWidth: 1,
    borderRadius: 4,
  },
  textInputErrorStyle: {
    padding: 15,
    backgroundColor: 'white',
    borderColor: theme.colors.validationError,
    borderWidth: 1,
    borderRadius: 4,
  }
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        style={!showError ? styles.textInputStyle : styles.textInputErrorStyle}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
        testID={name}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;