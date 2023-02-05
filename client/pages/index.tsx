import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Button, Input } from "@chakra-ui/react"
import { useEffect, useState } from 'react'
import {
  getContractConnection,
} from '../utils/contracts_helper_functions';
import { formatNFTCollectionForDisplay } from '../utils/image_functions';

import NavBar from "./Navbar"

const URLBASE = process.env.NEXT_PUBLIC_PRODUCTION === "true" ? 'https://incred-backend.herokuapp.com' : 'http://localhost:8080'

export default function Home() {
  const [nftCollection, setNftCollection] = useState([]);
  const [minerId, setMinerId] = useState<string>('')
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
        HOMEPAGE
      </main>
    </>
  )
}
