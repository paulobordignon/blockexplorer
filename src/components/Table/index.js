import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/react'
import { shortHash } from '../../utils/short-hash'

function BlockTable(data) {
  console.log('--------------', data)
  return data.data ? (
    <TableContainer>
      <Table variant='unstyled'>
        <Thead>
          <Tr>
            <Th color='#DFE5FE'>Block Number</Th>
            <Th color='#DFE5FE'>Txn Amount</Th>
            <Th color='#DFE5FE'>Block Hash</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map(item => {
            return (
              <Tr key={item.hash}>
                <Td color='#CED8FE'>{item.number}</Td>
                <Td color='#CED8FE'>{item.transactions}</Td>
                <Td color='#CED8FE'>{shortHash(item.hash)}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  ) : (
    <Spinner size='xl' color='#CED8FE' />
  );
}

function TxnTable(data) {
  console.log('yyyyyyyyyy', data.data)
  return data.data ? (
    <TableContainer>
      <Table variant='unstyled'>
        <Thead>
          <Tr>
            <Th color='#DFE5FE'>Txn Hash</Th>
            <Th color='#DFE5FE'>From / To</Th>
            <Th color='#DFE5FE'>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.data.map(item => {
            return (
              <Tr key={item.hash}>
                <Td color='#CED8FE'>{shortHash(item.hash)}</Td>
                <Td color='#CED8FE'>{`${shortHash(item.from)} => ${shortHash(item.to)}`}</Td>
                <Td color='#CED8FE'>{`${item.value} ETH`}</Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  ) : (
    <Spinner size='xl' color='#CED8FE' />
  );
}

export {BlockTable, TxnTable};
