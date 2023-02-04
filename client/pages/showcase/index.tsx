import { Image, Card, CardBody, CardHeader, SimpleGrid, Text, Spinner, VStack, ListItem, UnorderedList, Box, Heading, Stack, StackDivider } from "@chakra-ui/react";
import NavBar from "../Navbar"
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from 'react'
import {
    getContractConnection,
    setContractEventListeners,
} from '../utils/contracts_helper_functions';
import { formatNFTCollectionForDisplay } from '../utils/image_functions';

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
                <SimpleGrid minChildWidth='120px' spacing='40px' p={4}>

                    {imageLinks.map((cred: any) => {
                        return <Card key={cred.attributes.minerId}>
                            <CardHeader>
                                <Heading size='md'>{cred.name}</Heading>
                            </CardHeader>

                            <CardBody>
                                <Image src={cred.image} alt="badge" />
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Box key="minerid">
                                        <Heading size='xs' textTransform='uppercase'>
                                            MinerId
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {cred.attributes.minerId}
                                        </Text>
                                    </Box>
                                    <Box key="rawpower">
                                        <Heading size='xs' textTransform='uppercase'>
                                            Raw Power
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {cred.attributes.rawPower}
                                        </Text>
                                    </Box>
                                    <Box key="region">
                                        <Heading size='xs' textTransform='uppercase'>
                                            Region
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {cred.attributes.region}
                                        </Text>
                                    </Box>
                                    <Box key="reputationscore">
                                        <Heading size='xs' textTransform='uppercase'>
                                            Reputation Score
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {cred.attributes.reputationScore}
                                        </Text>
                                    </Box>
                                    <Box key="description">
                                        <Heading size='xs' textTransform='uppercase'>
                                            Description
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {cred.description}
                                        </Text>
                                    </Box>


                                </Stack>
                            </CardBody>
                        </Card>
                    })}
                </SimpleGrid>
            </main>
        </>
    )
}


