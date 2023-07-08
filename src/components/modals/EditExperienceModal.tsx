import { useAppDispatch } from '@/hooks/redux';
import { axiosClient } from '@/lib/utils/axiosInstance';
import { ExperienceDoc } from '@/models/experience.model';
import { editExperience } from '@/store/experiences.slice';
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
  useDisclosure,
} from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import { FC, useState } from 'react';
import InputField from '../utils/InputField';
import { ModalsProps } from './AboutModal';
import DeleteExperienceModal from './deletion/DeleteExperienceModal';

const EditExperienceModal: FC<ModalsProps & { experience: ExperienceDoc }> = ({
  isOpen,
  onClose,
  experience,
}) => {
  const dispatch = useAppDispatch();
  const endDate =
    experience.present === false
      ? new Date(experience.endDate).toISOString().split('T')[0]
      : null;

  const startDate = new Date(experience.startDate).toISOString().split('T')[0];
  const [isPresent, setIsPresent] = useState<boolean>(
    experience.present || false
  );
  const [startingDate, setStartingDate] = useState(startDate);
  const [endingDate, setEndingDate] = useState(endDate);
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();
  return (
    <Modal
      size={'3xl'}
      isOpen={isOpen}
      onClose={onClose}
      motionPreset="scale"
      isCentered
    >
      <ModalOverlay />
      <ModalContent bg={'gray.800'}>
        <ModalHeader>Update Positions</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              position: experience.position,
              companyName: experience.companyName,
              description: experience.description,
              startDate: experience.startDate,
              endDate: experience.present ? null : experience.endDate,
              present: experience.present,
            }}
            onSubmit={async (values) => {
              if (Object.values(values).every((val) => val === '')) {
                onClose();
                return;
              }
              if (endDate === '' && !isPresent) return;
              try {
                const { data } = await axiosClient.put('/user/experience', {
                  experience: {
                    _id: experience._id,
                    position: values.position,
                    companyName: values.companyName,
                    description: values.description || '',
                    startDate: startingDate ? startingDate : startDate,
                    endDate: isPresent ? null : endingDate || endDate,
                    present: isPresent,
                  },
                });
                dispatch(
                  editExperience({
                    experience: data,
                  })
                );
              } catch (err: any) {
                console.log(err);
              }
              onClose();
            }}
          >
            {({ values, isSubmitting }) => (
              <Form>
                <VStack spacing={4}>
                  <InputField
                    label="Position"
                    showLabel={'true'}
                    placeholder={experience.position}
                    autoComplete="off"
                    name="position"
                    type="text"
                  />
                  <InputField
                    label="Company"
                    showLabel={'true'}
                    placeholder={experience.companyName}
                    autoComplete="off"
                    name="companyName"
                    type="text"
                  />
                  <Flex
                    flexDir={['column', 'row']}
                    gap={2}
                    alignItems={['center']}
                    justifyContent={'space-between'}
                  >
                    <FormLabel>Start</FormLabel>
                    <Input
                      type="date"
                      size={'md'}
                      value={startDate}
                      onChange={(e) => setStartingDate(e.target.value)}
                    />
                    <FormLabel>End</FormLabel>
                    <Input
                      type="date"
                      placeholder="Select end date"
                      size={'md'}
                      value={endDate ? endDate : ''}
                      onChange={(e) => setEndingDate(e.target.value)}
                      isDisabled={isPresent}
                    />
                  </Flex>
                  <Flex my={2} alignItems="baseline">
                    <Checkbox
                      isChecked={isPresent}
                      onChange={(e) => setIsPresent(e.target.checked)}
                      mr={2}
                      colorScheme="teal"
                    >
                      Present
                    </Checkbox>
                  </Flex>
                  <Flex flexDir={'column'} w={'full'}>
                    <InputField
                      height={'3xs'}
                      label="Description"
                      showLabel={'true'}
                      type="text"
                      istextarea={'true'}
                      placeholder={experience.description}
                      name="description"
                    />
                  </Flex>
                  <ModalFooter gap={2}>
                    <Button
                      _focus={{
                        boxShadow: 'none',
                      }}
                      onClick={onOpenDeleteModal}
                      variant={'outline'}
                      colorScheme={'red'}
                    >
                      Delete
                    </Button>
                    <Button variant={'outline'} onClick={onClose}>
                      Cancel
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

        {isDeleteModalOpen && (
          <DeleteExperienceModal
            isOpen={isDeleteModalOpen}
            onClose={onCloseDeleteModal}
            experienceId={experience._id}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditExperienceModal;
