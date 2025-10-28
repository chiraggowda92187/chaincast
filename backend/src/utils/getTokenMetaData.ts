import { fetchDigitalAsset, fetchMetadataFromSeeds, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata";
import { createBaseUmi, publicKey } from "@metaplex-foundation/umi"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";

const umi = createUmi('https://api.devnet.solana.com').use(mplTokenMetadata())

export const getTokenMetaData = async (mintAddress: string) => {
    try {
        const mintKey = publicKey(mintAddress)
        const metaData = await fetchDigitalAsset(umi, mintKey)
        return {
            name : metaData.metadata.name,
            symbol : metaData.metadata.symbol,
        }
    } catch (error) {
        console.log("Error while getting meta data : ", error)
        return null
    }
}


getTokenMetaData("5a5CWt1yWpckVy8f7WPrRJRXKXZ4c5dwvJxbRHr2J71q")
