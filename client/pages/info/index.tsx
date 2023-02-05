import { Button, Center, Input, VStack, HStack, Flex, Card, CardBody, CardHeader, CardFooter, Text } from "@chakra-ui/react";
import { useState } from "react";
import NavBar from "../Navbar"
import styles from '@/styles/Home.module.css'
const URLBASE = process.env.NEXT_PUBLIC_PRODUCTION === "true" ? 'https://incred-backend.herokuapp.com' : 'http://localhost:8080'

export default function Index() {
    const [nftCollection, setNftCollection] = useState([]);
    const [minerId, setMinerId] = useState<string>('')

    const handleChange = async (e: any) => {
        setMinerId(e.target.value);
    }

    const handleSubmit = async (e: any) => {
        console.log(minerId)
        const response = await fetch(`${URLBASE}/mintCredential`, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ minerId: minerId }) })
        const txn = await response.json()
        console.log("Mint transaction", txn)

        alert(`Minting Credential with tx`)
    }
    return (
        <>
            <NavBar />
            <main className={styles.main} >
                <Flex justifyContent="center" alignItems="center" height="800px">
                    <Card minW='lg  ' bgColor="#333333">
                        <CardHeader>
                            <Text color="#DDDFE4" fontSize={"35px"}>Mint Credentials
                            </Text>
                        </CardHeader>
                        <CardBody>
                            <Input placeholder='Enter your MinerId' onChange={handleChange} value={minerId} />
                        </CardBody>
                        <CardFooter>
                            <Button onClick={handleSubmit} bgColor={"#F2C94C"} width="100%" >Mint Credential</Button>
                        </CardFooter>

                    </Card>
                    {/* <VStack>
                        <Input placeholder='minerId' onChange={handleChange} value={minerId} />
                        <Button onClick={handleSubmit}>Submit</Button>
                    </VStack> */}
                </Flex>

            </main>
        </>
    )
}


