import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import { Box, Text, Card, CardBody, CardHeader, Grid, GridItem, Heading, Image, Stack, StackDivider, Divider, Center, Flex, Spacer, SimpleGrid } from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import {
  getContractConnection,
} from '../utils/contracts_helper_functions';
import { formatNFTCollectionForDisplay } from '../utils/image_functions';

import NavBar from "./Navbar"

const URLBASE = process.env.NEXT_PUBLIC_PRODUCTION === "true" ? 'https://incred-backend.herokuapp.com' : 'http://localhost:8080'

export default function Home() {

  return (
    <>
      <NavBar />
      <main className={styles.main} >
        <Flex>
          <Box p={4} width="50%">
            <Card bg='#1E1E1E' >
              <CardHeader width="100%">
                <Heading textAlign="center" size='lg' color="white">Credentialing as a Service</Heading>
              </CardHeader>
              <Center>
                <Divider color="white" width="50%" />
              </Center>
              <CardBody>
                <Stack divider={<StackDivider borderColor='#1E1E1E' />} spacing='4'>
                  <Box height={"200px"}>
                    <Grid templateColumns='repeat(5, 1fr)' >
                      <GridItem w='100%' colSpan={3} height={'200px'} >
                        <Center h='200px'>
                          <Text color={"white"} textAlign={"center"} >
                            Credentialed Storage Providers benefit from access our lending platform - offering  new possibilities for growth and financial stability.
                          </Text>
                        </Center>
                      </GridItem>
                      <GridItem colStart={4} w='100%' height={'200px'} ml="70px" >
                        <Center h='200px'>
                          <Image src="/landing1.png" alt={'1'} maxH={"200px"} />
                        </Center>
                      </GridItem>
                    </Grid>
                  </Box>
                  <Box height={"200px"}>
                    <Grid templateColumns='repeat(5, 1fr)' >
                      <GridItem w='100%' colStart={1} colSpan={2} height={'200px'} >
                        <Center h='200px'>
                          <Image src="/landing3.png" alt={'2'} maxH={"200px"} />
                        </Center>
                      </GridItem>
                      <GridItem w='100%' colStart={3} colSpan={3} height={'200px'} >
                        <Center h='200px'>
                          <Text color={"white"} textAlign={"center"} >
                            Credentialed Storage Providers benefit from access our lending platform - offering  new possibilities for growth and financial stability.
                          </Text>
                        </Center>
                      </GridItem>
                    </Grid>
                  </Box>
                  <Box height={"200px"}>
                    <Grid templateColumns='repeat(5, 1fr)' >
                      <GridItem w='100%' colSpan={3} height={'200px'} >
                        <Center h='200px'>
                          <Text color={"white"} textAlign={"center"} >
                            Credentialed Storage Providers benefit from access our lending platform - offering  new possibilities for growth and financial stability.
                          </Text>
                        </Center>
                      </GridItem>
                      <GridItem colStart={4} w='100%' height={'200px'} ml="70px" >
                        <Center h='200px'>
                          <Image src="/landing2.png" alt={'3'} maxH={"200px"} />
                        </Center>
                      </GridItem>
                    </Grid>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </Box>
          <Spacer />
          <Box p={4} width="50%" >
            <Card bg='#1E1E1E' >
              <CardHeader width="100%">
                <Heading textAlign="center" size='lg' color="white">Roadmap</Heading>
              </CardHeader>

              <CardBody>
                <Center>

                  <Image src="/roadmap.png" alt={'roadmap'} minH={"500px"} maxH={"665px"} />
                </Center>
              </CardBody>
            </Card>
          </Box>
        </Flex>
      </main>
    </>
  )
}
