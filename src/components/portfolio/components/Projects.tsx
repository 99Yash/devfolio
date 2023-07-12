import Wrapper from '@/components/utils/Wrapper';
import React from 'react';
import SectionHeading from '@/components/utils/Heading';
import {
  Box,
  ButtonGroup,
  Card,
  CardBody,
  Flex,
  Heading,
  IconButton,
  ListItem,
  Stack,
  UnorderedList,
} from '@chakra-ui/react';
import { ACCENT_COLOR } from '@/styles/styles';
import { FiGithub } from 'react-icons/fi';
import { useAppSelector } from '@/hooks/redux';
import { BsBoxArrowInUpRight } from 'react-icons/bs';

const Projects = () => {
  const projectsState = useAppSelector((state) => state.projects.projects);
  return (
    <Wrapper>
      <Box id="projects" mb={16}>
        <SectionHeading sectionHeadingText={'Featured Projects'} />
      </Box>
      <Box mb={40}>
        {projectsState.map((project, index) => (
          <Flex
            key={project._id}
            flexDirection={[
              'column-reverse',
              'column-reverse',
              'column-reverse',
              'column-reverse',
              `${index % 2 === 0 ? 'row' : 'row-reverse'}`,
            ]}
            justifyContent={'space-between'}
            textAlign={[
              'left',
              'left',
              'left',
              'left',
              `${index % 2 === 0 ? 'left' : 'right'}`,
            ]}
            alignItems={'flex-start'}
            w="full"
            mb={24}
          >
            <Box w={['full']}>
              <Stack
                spacing={3}
                display={['none', 'none', 'none', 'none', 'block']}
              >
                <Heading
                  mb={2}
                  fontSize={'3xl'}
                  fontWeight="bold"
                  color={'gray.300'}
                  transition="all 0.2s ease-in-out"
                  _hover={{ color: ACCENT_COLOR }}
                  cursor={'pointer'}
                >
                  {project.title}
                </Heading>
              </Stack>

              <Card
                my={[0, 0, 0, 0, 2]}
                border="1px"
                borderColor={'emerald.900'}
                borderRadius={'none'}
                boxShadow={'rgba(37, 77, 146, 0.15) 0px 8px 32px 10px'}
                bgColor={'transparent'}
              >
                <CardBody
                  color={'gray.400'}
                  opacity={0.87}
                  letterSpacing="wide"
                  lineHeight={'base'}
                >
                  <Heading
                    display={['block', 'block', 'block', 'block', 'none']}
                    mb={4}
                    fontSize={'3xl'}
                    fontWeight="bold"
                    color={'gray.300'}
                    transition="all 0.2s ease-in-out"
                    _hover={{ color: ACCENT_COLOR }}
                    cursor={'pointer'}
                  >
                    {project.title}
                  </Heading>
                  {project.description}
                  <Stack w={'full'}>
                    <UnorderedList
                      listStyleType="none"
                      mt={4}
                      ml={0}
                      w={'full'}
                      justifyContent={
                        index % 2 === 0 ? 'flex-start' : 'flex-end'
                      }
                      display={['flex']}
                      flexWrap={'wrap'}
                    >
                      {project.techStack.map((tech) => (
                        <ListItem
                          key={tech}
                          fontFamily={'mono'}
                          mr={2}
                          mt={0}
                          flexDir={'row'}
                          mb={2}
                          color={ACCENT_COLOR}
                          fontSize={'sm'}
                        >
                          {tech}
                        </ListItem>
                      ))}
                    </UnorderedList>
                    <ButtonGroup
                      my={2}
                      variant="outline"
                      spacing={4}
                      display={['none', 'none', 'none', 'none', 'flex']}
                      justifyContent={
                        index % 2 === 0 ? 'flex-start' : 'flex-end'
                      }
                    >
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconButton
                          _hover={{ color: ACCENT_COLOR }}
                          fontSize="lg"
                          aria-label="github"
                          border={'none'}
                        >
                          <FiGithub />
                        </IconButton>
                      </a>
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconButton
                          _hover={{ color: ACCENT_COLOR }}
                          fontSize="lg"
                          aria-label="github"
                          border={'none'}
                        >
                          <BsBoxArrowInUpRight />
                        </IconButton>
                      </a>
                    </ButtonGroup>
                  </Stack>
                </CardBody>
              </Card>
            </Box>
          </Flex>
        ))}
      </Box>
    </Wrapper>
  );
};

export default Projects;
