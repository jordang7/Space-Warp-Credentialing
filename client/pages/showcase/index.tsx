import { Divider, Image, Card, CardBody, CardHeader, CardFooter, SimpleGrid, Text, Spinner, VStack, ListItem, UnorderedList, Box, Heading, Stack, StackDivider, Center, HStack, Grid, GridItem, Flex, Spacer } from "@chakra-ui/react";
import NavBar from "../Navbar"
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import {
    getContractConnection,
} from '../../utils/contracts_helper_functions';
import { formatNFTCollectionForDisplay } from '../../utils/image_functions';

export default function Index() {
    const [nftCollection, setNftCollection] = useState([]);
    const [imageLinks, setImageLinks] = useState([]);
    const [status, setStatus] = useState({
        loading: '',
        error: '',
        success: '',
        warning: '',
    });
    //INITIALISATION
    useEffect(() => {
        getDisplayData(); //should work with read only mode
    }, []);

    useEffect(() => {
        if (nftCollection && nftCollection[0]) {
            console.log('nftcollection', nftCollection);
            formatNFTCollectionForDisplay(nftCollection, setImageLinks);
        }
    }, [nftCollection]);

    const getDisplayData = async () => {
        console.log('Fetching nft data from contract...');
        const contract: any = await getContractConnection('read');
        await contract
            .getNFTCollection()
            .then(async (nftCollection: any) => {
                console.log('NFT collection', nftCollection);
                setNftCollection(nftCollection);
            })
            .catch((err: any) => {
                console.log('NFT fetching err', err);
                setStatus((prevState) => ({
                    ...prevState,
                    error: (err.message, 'Could not fetch nft collection'),
                }));
            });
    };


    return (
        <>
            <NavBar />
            <main className={styles.main} >
                <Center>
                    <Heading color="white" py={"30px"}> Credentialed Storage Providers</Heading>
                </Center>
                <SimpleGrid minChildWidth='345px' spacing='40px' p={4} >
                    {imageLinks.map((cred: any) => {
                        return <Card key={cred.attributes.minerId} maxWidth={"600px"} maxHeight={"600px"} bg='#1E1E1E' color="gray.500"  >
                            <CardHeader>
                                <Heading size='md'>{cred.name}</Heading>
                            </CardHeader>
                            <Center>
                                <Divider width={"90%"} />
                            </Center>
                            <CardBody>
                                <Grid templateColumns='repeat(5, 1fr)' >
                                    <GridItem w='100%' colStart={1} colSpan={2} height={'200px'} >
                                        <Center h='200px'>
                                            <Image src={cred.image} alt="badge" maxHeight={"170px"} />
                                        </Center>
                                    </GridItem>
                                    <GridItem w='100%' colStart={3} colSpan={3} height={'200px'} >
                                        <Flex>
                                            <Box px='4' py="2">
                                                <Heading size='md' textTransform='uppercase' textAlign={"left"}>
                                                    Reputation Score
                                                </Heading>
                                            </Box>
                                            <Spacer />
                                            <Box py="2">
                                                <Text fontSize='xl' textAlign={"right"}>
                                                    {cred.attributes.reputationScore}
                                                </Text>
                                            </Box>
                                        </Flex>
                                        <Flex>
                                            <Box px='4' py="2">
                                                <Heading size='md' textTransform='uppercase' textAlign={"left"}>
                                                    Miner Id
                                                </Heading>
                                            </Box>
                                            <Spacer />
                                            <Box py="2">
                                                <Text fontSize='md' textAlign={"right"} py="2">
                                                    {cred.attributes.minerId}
                                                </Text>
                                            </Box>
                                        </Flex>
                                        <Flex>
                                            <Box px='4' >
                                                <Heading size='md' textTransform='uppercase' textAlign={"left"}>
                                                    Region
                                                </Heading>
                                            </Box>
                                            <Spacer />
                                            <Box>
                                                <Text fontSize='md' textAlign={"right"}>
                                                    {cred.attributes.region}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </GridItem>
                                </Grid>
                                <Center>
                                    <Divider />
                                </Center>
                                <Flex>
                                    <Center>
                                        <Box p="2" >
                                            <Heading size='sm' textTransform='uppercase' textAlign={"left"} py="2">
                                                Total Raw Power
                                            </Heading>
                                        </Box>
                                    </Center>
                                    <Spacer />
                                    <Box p="2">
                                        <Text fontSize='md' py="3">
                                            {(Number(cred.attributes.rawPower) / 1000000000000)?.toFixed(2)} PIB
                                        </Text>
                                    </Box>
                                </Flex>
                                <Center>
                                    <Divider />
                                </Center>
                                <Flex>
                                    <Center>
                                        <Box p="2" >
                                            <Heading size='sm' textTransform='uppercase' textAlign={"left"} py="2">
                                                Description
                                            </Heading>
                                        </Box>
                                    </Center>
                                    <Spacer />
                                    <Box p="2">
                                        <Text fontSize='sm' py="3" textAlign={"right"}>
                                            {cred.description}
                                        </Text>
                                    </Box>
                                </Flex>
                                <Center>
                                    <Divider />
                                </Center>

                            </CardBody>
                        </Card>
                    })}
                </SimpleGrid>
            </main>
        </>
    )
}


