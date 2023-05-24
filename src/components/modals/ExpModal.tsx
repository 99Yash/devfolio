import { useAddExperienceMutation } from '@/store/userApi';
import {
  Button,
  Flex,
  FormControl,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import InputField from '../utils/InputField';
import { ModalsProps } from './AboutModal';

const ExpModal: FC<ModalsProps> = (props) => {
  const [addExp, results] = useAddExperienceMutation();
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
              startDate: {
                month: 'Jan',
                year: '2021',
              },
              endDate: {
                month: 'Jan',
                year: '2023',
              },
              description: '',
            }}
            onSubmit={async (values) => {
              if (Object.values(values).every((val) => val === '')) {
                props.onClose();
                return;
              }
              try {
                await addExp({
                  experience: {
                    position: values.position,
                    companyName: values.companyName,
                    startDate: {
                      month: values.startDate.month,
                      year: values.startDate.year,
                    },
                    endDate: {
                      month: values.endDate.month,
                      year: values.endDate.year,
                    },
                    description: values.description,
                  },
                });
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
                    showLabel={true}
                    placeholder="Sr. Software Engineer"
                    autoComplete="off"
                    name="position"
                    type="text"
                  />
                  <InputField
                    label="Company"
                    showLabel={true}
                    placeholder="Company Name"
                    autoComplete="off"
                    name="companyName"
                    type="text"
                  />
                  <HStack w={'full'}>
                    <VStack>
                      <FormControl>
                        <Text>Start</Text>
                        <HStack>
                          <Select name={values.startDate.month}>
                            {[
                              'January',
                              'February',
                              'March',
                              'April',
                              'May',
                              'June',
                              'July',
                              'August',
                              'September',
                              'October',
                              'November',
                              'December',
                            ].map((month) => {
                              return (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              );
                            })}
                          </Select>
                          <Select
                            name={values.startDate.year}
                            minWidth={'fit-content'}
                          >
                            {[
                              '2021',
                              '2020',
                              '2019',
                              '2018',
                              '2017',
                              '2016',
                              '2015',
                              '2014',
                              '2013',
                              '2012',
                              '2011',
                            ].map((year) => {
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </Select>
                        </HStack>
                      </FormControl>
                    </VStack>
                    <VStack>
                      <FormControl>
                        <Text>End</Text>
                        <HStack>
                          <Select
                            name={values.endDate.month}
                            minWidth={'fit-content'}
                          >
                            {[
                              'January',
                              'February',
                              'March',
                              'April',
                              'May',
                              'June',
                              'July',
                              'August',
                              'September',
                              'October',
                              'November',
                              'December',
                            ].map((month) => {
                              return (
                                <option key={month} value={month}>
                                  {month}
                                </option>
                              );
                            })}
                          </Select>
                          <Select
                            name={values.endDate.year}
                            minWidth={'fit-content'}
                          >
                            {[
                              '2023',
                              '2022',
                              '2021',
                              '2020',
                              '2019',
                              '2018',
                              '2017',
                              '2016',
                              '2015',
                              '2014',
                              '2013',
                              '2012',
                              '2011',
                            ].map((year) => {
                              return (
                                <option key={year} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </Select>
                          {/* <FormLabel>Current</FormLabel>
                        <Switch value={'present'} /> */}
                        </HStack>
                      </FormControl>
                    </VStack>
                  </HStack>
                  <Flex flexDir={'column'} w={'full'}>
                    <InputField
                      label="Description"
                      showLabel={true}
                      type="text"
                      placeholder="Add some Description"
                      name="description"
                    ></InputField>
                  </Flex>
                  <ModalFooter>
                    <Button
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
