import { createContext, useState } from "react";
import { TezosToolkit } from "@taquito/taquito";

export const TezosContext = createContext([]);

export const TezosProvider = (props: any) => {

    const Tezos: any = new TezosToolkit("https://florencenet.smartpy.io");

    return (
        <TezosContext.Provider value={Tezos}>
            {props.children}
        </TezosContext.Provider>
    )
}