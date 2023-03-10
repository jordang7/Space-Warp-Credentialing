import { Button, Alert, AlertIcon, Input, AlertTitle, AlertDescription, Link, Flex, Card, CardBody, CardHeader, CardFooter, Text, Spinner, VStack } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "../Navbar"
import styles from '@/styles/Home.module.css'
import Register from "../register/index"
const URLBASE = process.env.NEXT_PUBLIC_PRODUCTION === "true" ? 'https://incred-backend.herokuapp.com' : 'http://localhost:8080'

export default function Index() {
    const [nftCollection, setNftCollection] = useState([]);
    const [minerId, setMinerId] = useState<string>('')
    const [pubKey, setPubKey] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)
    const [txn, setTxn] = useState<string>('')

    const handleIdChange = async (e: any) => {
        setMinerId(e.target.value); 
    }
    const handleKeyChange = async (e: any) => {
        setPubKey(e.target.value); 
    }

    const handleSubmit = async (e: any) => {
        console.log(minerId)
        setLoading(true)
        const response = await fetch(`${URLBASE}/mintCredential`, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ minerId: minerId ,pubKey:pubKey}) })
        const txn = await response.json()
        console.log("Mint transaction", txn)
        setLoading(false);
        setTxn(txn.hash)
    }

    return (
        <>
            <NavBar />
            <main className={styles.main} >
                <Flex justifyContent="center" alignItems="center" height="800px">
                    {loading ? <Spinner size="xl" color="white" /> : txn.length ?
                        <>
                            <Card minW='lg' bgColor="#333333">
                                <VStack>
                                    <CardBody width="100%"  >
                                        <Alert status='success'
                                            flexDirection='column'
                                            alignItems='center'
                                            justifyContent='center'
                                            textAlign='center'
                                            height='150px'
                                            variant={"solid"}
                                        >
                                            <AlertIcon boxSize='40px' mr={0} />
                                            <AlertTitle mt={4} mb={1} fontSize='lg'>
                                                Successfully created Credential!
                                            </AlertTitle>
                                            <AlertDescription maxWidth='sm'>
                                                <Link target="_blank" rel="noreferrer" href={`https://fvm.starboard.ventures/transactions/${txn}`}>Explore Txn</Link>
                                            </AlertDescription>
                                        </Alert>
                                    </CardBody>
                                    <CardFooter>

                                        <Button bgColor={"#F2C94C"} onClick={() => setTxn('')}>Mint Another Credential</Button>
                                    </CardFooter>
                                </VStack>
                            </Card>
                        </>
                        : <Card minW='lg' bgColor="#333333">
                            <CardHeader>
                                <Text color="#DDDFE4" fontSize={"35px"}>Mint Credentials
                                </Text>
                            </CardHeader>
                            <CardBody>
                            <VStack color="white">
                                <Input color="white" placeholder='Enter your MinerId' onChange={handleIdChange} value={minerId} />
                                <Input color="white" placeholder='Enter your Address' onChange={handleKeyChange} value={pubKey} />
                            </VStack>
                            </CardBody>
                            <CardFooter>
                                <Button onClick={handleSubmit} bgColor={"#F2C94C"} width="100%" >Mint Credential</Button>
                            </CardFooter>
                        </Card>}

                    {/* <VStack>
                        <Input placeholder='minerId' onChange={handleChange} value={minerId} />
                        <Button onClick={handleSubmit}>Submit</Button>
                    </VStack> */}
                </Flex>

            </main>
        </>
    )
}


