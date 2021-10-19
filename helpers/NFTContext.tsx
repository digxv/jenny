import { createContext, useState } from "react";
import { TezosToolkit } from "@taquito/taquito";

export const NFTContext = createContext([]);

export const NFTProvider = (props: any) => {

    const [NFT, setNFT]: any = useState([]);

    const value: any = [NFT, setNFT];

    return (
        <NFTContext.Provider value={value}>
            {props.children}
        </NFTContext.Provider>
    )
}