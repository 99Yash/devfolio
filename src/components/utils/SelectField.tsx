import { FC } from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  SelectProps,
} from '@chakra-ui/react';
import { FieldHookConfig, useField } from 'formik';

type SelectFieldProps = FieldHookConfig<string> &
  SelectProps & {
    label: string;
  };

const SelectField: FC<SelectFieldProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  const { error, touched } = meta;

  return (
    <FormControl isInvalid={!!error && touched}>
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Select>{props.children}</Select>
      {error && touched && <FormErrorMessage>{error}</FormErrorMessage>}
    </FormControl>
  );
};

export default SelectField;
