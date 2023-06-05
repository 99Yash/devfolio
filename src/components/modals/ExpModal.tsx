import { useAppDispatch } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { addExperience } from '@/store/user.slice';
import {
  Button,
  Checkbox,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import InputField from '../utils/InputField';
import { ModalsProps } from './AboutModal';

const ExpModal: FC<ModalsProps> = (props) => {
  const dispatch = useAppDispatch();
  const [startDate, setStartDate] = useState('');
  const [isPresent, setIsPresent] = useState(false);
  const [endDate, setEndDate] = useState('');

  return (
    <Modal
      size={'3xl'}
      isOpen={props.isOpen}
      onClose={props.onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update Positions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              position: '',
              companyName: '',
              description: '',
            }}
            onSubmit={async (values) => {
              if (Object.values(values).every((val) => val === '')) {
                props.onClose();
                return;
              }
              if (startDate === '' || (endDate === '' && !isPresent)) return;
              try {
                const { data } = await axiosClient.post('/user/experience', {
                  experience: {
                    position: values.position,
                    companyName: values.companyName,
                    description: values.description,
                    startDate,
                    endDate: isPresent ? 'present' : endDate,
                    present: isPresent,
                  },
                });
                console.log(data);
                dispatch(
                  addExperience({
                    experience: data,
                  })
                );
              } catch (err: any) {
                console.error(err);
              }
              props.onClose();
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <VStack>
                  <InputField
                    label="position"
                    showLabel={'true'}
                    placeholder="Sr. Software Engineer"
                    autoComplete="off"
                    name="position"
                    type="text"
                  />
                  <InputField
                    label="Company"
                    showLabel={'true'}
                    placeholder="Company Name"
                    autoComplete="off"
                    name="companyName"
                    type="text"
                  />
                  <Flex justifyContent={'space-between'}>
                    <FormLabel>Start</FormLabel>
                    <Input
                      type="date"
                      placeholder="Select start date"
                      size={'md'}
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                    <FormLabel>End</FormLabel>
                    <Input
                      type="date"
                      placeholder="Select end date"
                      size={'md'}
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      isDisabled={isPresent}
                    />
                  </Flex>
                  <Flex my={2} alignItems="baseline">
                    <Checkbox
                      checked={isPresent}
                      onChange={(e) => setIsPresent(e.target.checked)}
                      mr={2}
                      defaultChecked={false}
                      colorScheme="teal"
                    ></Checkbox>
                    <FormLabel ml={2}>Present</FormLabel>
                  </Flex>
                  <Flex flexDir={'column'} w={'full'}>
                    <InputField
                      label="Description"
                      showLabel={'true'}
                      type="text"
                      placeholder="Add some Description"
                      name="description"
                    />
                  </Flex>
                  <ModalFooter>
                    <Button
                      _focus={{
                        boxShadow: 'none',
                      }}
                      variant={'outline'}
                      onClick={() => props.onClose()}
                      colorScheme="red"
                      mr={3}
                    >
                      Delete
                    </Button>
                    <Button
                      isLoading={isSubmitting}
                      type="submit"
                      colorScheme={'teal'}
                    >
                      Save
                    </Button>
                  </ModalFooter>
                </VStack>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ExpModal;
