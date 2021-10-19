import React, { createContext, useState } from "react";
import { DAppClient, NetworkType  } from "@airgap/beacon-sdk";

export const AuthContext = createContext([]);

export const AuthProvider = (props: any) => {

    // const dAppClient = new DAppClient({ name: "Beacon", preferredNetwork: NetworkType.FLORENCENET });

    const [auth, setAuth] = useState({
        dappClient: null,
        address: "",
        isConnected: false,
        isLoggedIn: false
    });

    const value: any = [auth, setAuth];

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}