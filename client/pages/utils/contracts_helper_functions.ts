declare let window: any
import { ethers } from "ethers"
import CredentialsCompiledContract from "../utils/SPCredentials.json"
import { CHAIN_DATA, INITIAL_WALLET_STATUS } from "../utils/consts"
import { ChainData } from "../utils/interfaces"

const contractAddressHyperspace = "0x1c785aCB4c2e577B72d10Aa2A58666CDBabD9Ca7"

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
