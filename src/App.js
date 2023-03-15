import { useEffect, useState } from 'react';
import { Alchemy, Network } from 'alchemy-sdk';
import { Box, Container, Text } from '@chakra-ui/react'

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });

  return (
    <Container p={0} maxW='100vw' h='100vh' bg='blackAlpha.900'>
      <Box p={4} bg='blackAlpha.400'>
        <Text
          bgGradient='linear(to-l, #CED8FE, #3861FB)'
          bgClip='text'
          fontSize='xl'
          fontWeight='extrabold'
        >
          ETHEXPLORER
        </Text>
      </Box>
      <Container px='10vh' py='5vh' maxW='100vw'>
        <Box p={4} borderWidth='1px' borderRadius='lg' borderColor='gray.600'>
          <Text
            color='#CED8FE'
            fontSize='xm'
            align='center'
          >
            Latest Block: {blockNumber}
          </Text>
        </Box>
      </Container>
    </Container>
  );
}

export default App;
