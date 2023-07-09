import { getIconByLinkName } from '@/components/utils/getIconsByLink';
import { useAppSelector } from '@/hooks/redux';
import { ACCENT_COLOR } from '@/styles/styles';
import { Box, ListItem, UnorderedList } from '@chakra-ui/react';
import React from 'react';
import Link from 'next/link';

const Socials = () => {
  const socialLinks = useAppSelector((state) => state.socials.socials);
  return (
    <Box
      position={['absolute', 'absolute', 'fixed', 'fixed']}
      bottom={[10, 10, 0, 0]}
      w={['full', 'full', 'auto', 'auto']}
      display={['flex', 'flex', 'block', 'block']}
    >
      <UnorderedList
        w={'full'}
        ml={[0, 0, 12, 12]}
        display={['flex', 'flex', 'block', 'block']}
        justifyContent={'center'}
        alignItems={'center'}
        listStyleType={'none'}
        _after={{
          content: '""',
          display: ['none', 'none', 'block', 'block'],
          position: 'relative',
          right: '36%',
          width: '.8px',
          height: '6rem',
          margin: '0 auto',
          bgColor: ACCENT_COLOR,
        }}
      >
        {socialLinks.map((link) => (
          <ListItem my={10} mx={[10, 10, 0, 0]} key={link._id}>
            <Link
              key={link._id}
              href={link.url}
              className="font-semibold text-2xl text-emerald-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              {getIconByLinkName(link.name)}
            </Link>
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default Socials;
