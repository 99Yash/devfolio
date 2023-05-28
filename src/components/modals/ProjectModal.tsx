import { useAddProjectMutation } from '@/store/userApi';
import {
  Button,
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
import { FC, useEffect } from 'react';
import InputField from '../utils/InputField';
import { ModalsProps } from './AboutModal';
import axios from 'axios';
import { useAppDispatch } from '@/hooks/redux';
import { addProject } from '@/store/user.slice';
import { ProjectDoc } from '@/models/project.model';

const ProjectModal: FC<ModalsProps> = ({ isOpen, onClose }) => {
  // const [addProject, { isLoading, isError, isSuccess }] =
  //   useAddProjectMutation();

  const dispatch = useAppDispatch();

  return (
    <Modal size={'2xl'} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              title: '',
              description: '',
              githubLink: '',
              demoLink: '',
              techStack: '',
            }}
            onSubmit={async (values, actions) => {
              if (Object.values(values).every((val) => val === '')) {
                onClose();
                return;
              }
              try {
                const { data } = await axios.post<{ project: ProjectDoc }>(
                  '/api/user/project',
                  {
                    project: {
                      title: values.title,
                      description: values.description,
                      githubLink: values.githubLink,
                      demoLink: values.demoLink,
                      techStack: values.techStack,
                    },
                  }
                );
                dispatch(addProject(data));
                console.log(data);
              } catch (err: any) {
                console.error(err);
              }
              onClose();
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <VStack display={'flex'} gap={2}>
                  <InputField
                    label="Title"
                    name="title"
                    showLabel={'true'}
                    placeholder="Title"
                  />
                  <InputField
                    istextarea={'true'}
                    label="Description"
                    name="description"
                    showLabel={'true'}
                    placeholder="Description"
                  />
                  <InputField
                    label="Share Github link"
                    name="githubLink"
                    showLabel={'true'}
                    placeholder="Github Link"
                  />
                  <InputField
                    label="Share domain"
                    name="demoLink"
                    showLabel={'true'}
                    placeholder="Demo Link"
                  />
                  <InputField
                    label="Tech Stack"
                    name="techStack"
                    showLabel={'true'}
                    placeholder="Share tech used,separated with a comma"
                  />
                  <ModalFooter>
                    <Button
                      onClick={() => onClose()}
                      variant={'outline'}
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

export default ProjectModal;
