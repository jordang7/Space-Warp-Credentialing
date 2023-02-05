import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Flex, Input, VStack } from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import NavBar from "../Navbar"
const URLBASE = process.env.NEXT_PUBLIC_PRODUCTION === "true" ? 'https://incred-backend.herokuapp.com' : 'http://localhost:8080'
console.log(process.env.NEXT_PUBLIC_PRODUCTION)
export default function Index() {
    const [minerId, setMinerId] = useState<string>('')
    const [address, setAddress] = useState<string>('')
    const handleMinerIdChange = async (e: any) => {
        setMinerId(e.target.value);
    }
    const handleAddressChange = async (e: any) => {
        setMinerId(e.target.value);
    }

    const handleSubmit = async (e: any) => {
        console.log(minerId)
        const response = await fetch(`${URLBASE}/registerMiner`, { method: "POST", headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ minerId: minerId, address: address }) })
        const txn = await response.json()
        console.log("RegisterMiner", txn)

        alert(`Registering Miner with tx`)
    }
    return (
        <>
            <NavBar />
            <main className={styles.main} >
                <Flex justifyContent="center" alignItems="center" height="800px">
                    <VStack>
                        <Input placeholder='minerId' onChange={handleMinerIdChange} value={minerId} />
                        <Input placeholder='address' onChange={handleAddressChange} value={address} />
                        <Button onClick={handleSubmit}>Submit</Button>
                    </VStack>
                </Flex>

            </main>
        </>
    )
}
