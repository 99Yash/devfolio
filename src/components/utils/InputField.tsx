import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { FC, InputHTMLAttributes } from 'react';

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label?: string;
  showLabel: 'true' | 'false';
  istextarea?: 'true' | 'false';
  autoComplete?: 'on' | 'off';
  variant?: 'outline' | 'filled' | 'flushed' | 'unstyled';
};

const InputField: FC<InputFieldProps> = ({
  label,
  showLabel,
  size: _, //*remove size from props
  ...props
}) => {
  let InputOrTextArea = Input;
  if (props.istextarea === 'true') {
    //@ts-ignore
    InputOrTextArea = Textarea;
  }
  const [field, { error, touched }] = useField(props);

  return (
    <FormControl isInvalid={(error && touched) as boolean | undefined}>
      {showLabel && <FormLabel htmlFor={field.name}>{label}</FormLabel>}
      <Flex gap={8}>
        <InputOrTextArea
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
          type={!props.istextarea && props.type ? props.type : 'text'}
          mt={showLabel === 'true' ? 0 : 2}
          style={{ backgroundColor: 'gray.900' }}
          autoComplete={props.autoComplete ? props.autoComplete : 'on'}
          variant={props.variant ? props.variant : 'outline'}
        />
      </Flex>
      {error && touched ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
