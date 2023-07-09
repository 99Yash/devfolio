import SectionHeading from '@/components/utils/Heading';
import Wrapper from '@/components/utils/Wrapper';
import { useAppSelector } from '@/hooks/redux';
import { ACCENT_COLOR } from '@/styles/styles';
import {
  Box,
  Flex,
  Heading,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';

const Experiences = () => {
  const experiencesList = useAppSelector(
    (state) => state.experiences.experiences
  );

  return (
    <Wrapper>
      <Box mb={[16]}>
        <SectionHeading sectionHeadingText={'Work Experiences'} />
      </Box>
      <Flex flexDir={['column', 'column', 'row', 'row']} mb={40}>
        <Box flex={1}>
          {experiencesList.map((exp) => (
            <Box key={exp._id} w="full" py={3}>
              <Flex flexDirection={'column'}>
                <Flex gap={2} alignItems={'baseline'}>
                  <Heading
                    fontSize={'2xl'}
                    fontWeight="semibold"
                    color={'gray.300'}
                    mb={2}
                  >
                    {exp.position}{' '}
                  </Heading>
                  <Text fontSize={'2xl'} color={ACCENT_COLOR}>
                    @{exp.companyName}
                  </Text>
                </Flex>
                <Flex flexDir={'column'}>
                  <Text color={'gray.300'} fontFamily="mono">
                    {`${new Date(exp.startDate).toLocaleString('default', {
                      month: 'long',
                    })} ${new Date(exp.startDate).getFullYear()}`}{' '}
                    -{' '}
                    {exp.present === false
                      ? `${new Date(exp.endDate).toLocaleString('default', {
                          month: 'long',
                        })} ${new Date(exp.endDate).getFullYear()}`
                      : 'Present'}
                  </Text>
                </Flex>

                <Box mt={3}>
                  <Text
                    fontFamily={'sans-serif'}
                    listStyleType={'none'}
                    mx={0}
                    lineHeight={'tall'}
                    fontWeight="light"
                    color={'gray.400'}
                    letterSpacing={'wide'}
                  >
                    {exp.description}
                  </Text>
                </Box>
              </Flex>
            </Box>
          ))}
        </Box>
      </Flex>
    </Wrapper>
  );
};

export default Experiences;
