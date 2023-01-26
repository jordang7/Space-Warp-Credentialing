declare let window: any
import { ethers } from "ethers"
import CredentialsCompiledContract from "../utils/SPCredentials.json"
import { CHAIN_DATA, INITIAL_WALLET_STATUS } from "../utils/consts"
import { ChainData } from "../utils/interfaces"

const contractAddressHyperspace = "0x1827D0319a4D61EC0Eb564f22A57a532B9B66c76"

//Destructure for other chain additions
//TODO: Fix me. both return the same thing
export const getContractConnection = async (mode: String) => {
    console.log("Connection to Contract...")
    let rpc = process.env.NEXT_PUBLIC_RPC_FILECOIN_HYPERSPACE
    let provider, signer, credContract
    if (mode === "read") {
        provider = new ethers.providers.JsonRpcProvider(rpc)
        credContract = new ethers.Contract(
            contractAddressHyperspace,
            CredentialsCompiledContract.abi,
            provider
        )
    } else if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(
            contractAddressHyperspace,
            CredentialsCompiledContract.abi,
            provider
        )
        signer = provider.getSigner()
        credContract = contract.connect(signer)
        console.log("Cred contract", credContract)
    }
    return credContract
}

export const fetchContractConnection = async (
    mode: string,
    rpc: string,
    contractAddress: string
) => {
    console.log("Connection to Contract...")
    let provider, contract //,signer;
    if (mode === "read") {
        provider = new ethers.providers.JsonRpcProvider(rpc)
        contract = new ethers.Contract(contractAddress, BacalhauCompiledContract.abi, provider)
    } else if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum)
        contract = new ethers.Contract(contractAddress, BacalhauCompiledContract.abi, provider)
        // signer = provider.getSigner();
        // connectedcontract = contract.connect(signer);
    }
    return contract
}

//Events never fire.... hmmm
export const setContractEventListeners = async (
    setStatus: Function,
    getDisplayData: Function,
    getNFTByOwner: Function
) => {
    const connectedContract: any = await getContractConnection("read")
    console.log("connectedcontract", connectedContract)
    // THIS NEVER FIRES - fvm events bug?
    connectedContract.on(
        "NewBacalhauFRC721NFTMinted",
        (sender: string, tokenId: number, tokenURI: string) => {
            console.log("NewbacalhauNFTMinted event triggered, data: ", sender, tokenId, tokenURI)
            setStatus({ ...INITIAL_WALLET_STATUS, success: "Minted NFT" })
            ;() => getDisplayData()
            ;() => getNFTByOwner()
            console.log("re-fetch data on trigger")
        }
    )
}
