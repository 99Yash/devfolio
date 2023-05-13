import { Flex, Heading } from '@chakra-ui/react';
import React from 'react';
import { FC } from 'react';

const Experiences: FC<{
  experiences: {
    position: string;
    companyName: string;
    startDate: {
      month: string;
      year: string;
    };
    endDate: {
      month: string;
      year: string;
    };
    description: string;
  }[];
}> = ({ experiences }) => {
  return (
    <>
      {experiences.map((exp) => (
        <Flex flexDir={'column'} key={exp.description}>
          <Heading size={'sm'}>{exp.position}</Heading>
          <Heading size={'sm'}>{exp.companyName}</Heading>
          <Heading size={'sm'}>
            {exp.startDate.month} {exp.startDate.year} to {exp.endDate.month}{' '}
            {exp.endDate.year}
          </Heading>
          <Heading size={'sm'}>{exp.description}</Heading>
        </Flex>
      ))}
    </>
  );
};

export default Experiences;
