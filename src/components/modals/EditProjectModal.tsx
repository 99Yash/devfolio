import { useAppDispatch } from '@/hooks/redux';
import { ProjectDoc } from '@/models/project.model';
import { editProject } from '@/store/user.slice';
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
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { FC } from 'react';
import InputField from '../utils/InputField';
import { ModalsProps } from './AboutModal';
import DeleteProjectModal from './deletion/DeleteProjectModal';

const EditProjectModal: FC<ModalsProps & { project: ProjectDoc }> = ({
  isOpen,
  onClose,
  project,
}) => {
  const dispatch = useAppDispatch();
  const {
    isOpen: isDeleteModalOpen,
    onOpen: onOpenDeleteModal,
    onClose: onCloseDeleteModal,
  } = useDisclosure();

  return (
    <Modal size={'2xl'} isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Formik
            initialValues={{
              title: project.title,
              description: project.description || '',
              githubLink: project.githubLink,
              demoLink: project.demoLink || '',
              techStack:
                project.techStack && project.techStack?.length > 0
                  ? project.techStack.join(', ')
                  : '',
            }}
            onSubmit={async (values, actions) => {
              if (Object.values(values).every((val) => val === '')) {
                onClose();
                return;
              }
              try {
                const { data } = await axios.put<ProjectDoc>(
                  '/api/user/project',
                  {
                    project: {
                      _id: project._id,
                      title: values.title,
                      description: values.description,
                      githubLink: values.githubLink,
                      demoLink: values.demoLink,
                      techStack: values.techStack,
                    },
                  }
                );
                dispatch(editProject({ project: data }));
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
                    placeholder={project.title}
                  />
                  <InputField
                    istextarea={'true'}
                    label="Description"
                    name="description"
                    showLabel={'true'}
                    placeholder={
                      project.description
                        ? project.description
                        : 'Project Description'
                    }
                  />
                  <InputField
                    label="Share Github link"
                    name="githubLink"
                    showLabel={'true'}
                    placeholder={project.githubLink}
                  />
                  <InputField
                    label="Share domain"
                    name="demoLink"
                    showLabel={'true'}
                    placeholder={
                      project.demoLink ? project.demoLink : 'Demo Link'
                    }
                  />
                  <InputField
                    label="Tech Stack"
                    name="techStack"
                    showLabel={'true'}
                    placeholder={
                      project.techStack && project.techStack?.length > 0
                        ? project.techStack.join(', ')
                        : 'Tech Stack'
                    }
                  />
                  <ModalFooter>
                    <Button
                      _focus={{}}
                      onClick={onOpenDeleteModal}
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
        {isDeleteModalOpen && (
          <DeleteProjectModal
            isOpen={isDeleteModalOpen}
            onClose={onCloseDeleteModal}
            projectId={project._id}
          />
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditProjectModal;
