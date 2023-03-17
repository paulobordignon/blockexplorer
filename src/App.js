import { useEffect, useState } from 'react';
import { Alchemy, AssetTransfersCategory, Network, SortingOrder } from 'alchemy-sdk';
import { Box, Container, Text } from '@chakra-ui/react'
import { BlockTable, TxnTable } from './components/Table';

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  const [blockNumber, setBlockNumber] = useState();
  const [lastBlocks, setLastBlocks] = useState();
  const [lastTransactions, setLastTransactions] = useState();

  useEffect(() => {
    let lastBlockNumber = 0

    async function getBlockNumber() {
      const getBlockNumber = await alchemy.core.getBlockNumber()
      setBlockNumber(getBlockNumber);
      lastBlockNumber = getBlockNumber
    }

    async function getLastBlocks() {
      const blocks = []
      for (let i = 0; i < 10; i++) {
        const { number, transactions, hash } = await alchemy.core.getBlock(lastBlockNumber - (i + 1))
  
        blocks.push({number, transactions: transactions.length, hash})
      }

      setLastBlocks(blocks)
    }

    async function getLastTransactions() {
      const data = await alchemy.core.getAssetTransfers({
        fromBlock: 'latest',
        toBlock: 'latest',
        maxCount: 10,
        category: [
          AssetTransfersCategory.ERC1155,
          AssetTransfersCategory.ERC20,
          AssetTransfersCategory.INTERNAL,
          AssetTransfersCategory.EXTERNAL,
          AssetTransfersCategory.ERC721,
        ],
        order: SortingOrder.DESCENDING,
      })  
      const transactions = []
      data.transfers.map(item => 
        transactions.push({hash: item.hash, from: item.from, to: item.to, value: item.value})
      )

      setLastTransactions(transactions)
    }

    getBlockNumber();
    getLastBlocks();
    getLastTransactions();
  }, []);

  return (
    <Container p={0} maxW='100vw' minH='100vh' bg='blackAlpha.900'>
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
      <Container px={['1vh','1vh','1vh','10vh','10vh']} py='5vh' maxW='100vw'>
        <Box py={4} borderRadius='lg' background='#3861FB'>
          <Text
            color='#CED8FE'
            fontSize='xm'
            align='center'
            fontWeight={700}
          >
            Latest Block: {blockNumber}
          </Text>
        </Box>
        <Box display='flex' justifyContent='space-between' mt='4vh' flexDirection={['column', 'column', 'column', 'row', 'row']}>
          <Box p={4} w={['100%', '100%', '100%', '49%', '49%']} borderWidth='1px' borderRadius='lg' borderColor='gray.700'>
            <BlockTable data={lastBlocks} />
          </Box>
          <Box p={4} w={['100%', '100%', '100%', '49%', '49%']} borderWidth='1px' borderRadius='lg' borderColor='gray.700'>
            <TxnTable data={lastTransactions} />
          </Box>
        </Box>
      </Container>
    </Container>
  );
}

export default App;
