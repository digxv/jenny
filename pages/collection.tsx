import { Button, Input, Modal, Note } from "@geist-ui/react";
import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import { AuthContext } from "../helpers/AuthContext";
import { TezosContext } from "../helpers/TezosContext";
import { bytes2Char } from "@taquito/utils";

import { DAppClient, TezosOperationType } from "@airgap/beacon-sdk";
import { CONTRACT_ADDRESS, sanitizeJsonUri } from "../helpers/utils";
import NFTList from "../components/NFTList";

export default function Mint() {
    const Tezos: any = useContext(TezosContext);
    const [auth, setAuth]: any = useContext(AuthContext);
    const [NFTs, setNFTs]: any = useState([]);
    const [loading, setLoading]: any = useState(true);
    const [count, setCount]: any = useState(0);

    function fetch_token_metadata(value: any) {
        return new Promise((resolve) => {
          if (value !== undefined) {
            try {
                fetch(sanitizeJsonUri(value.ipfs_hash))
                .then(res => res.json())
                .then(obj => {
                    const card = {
                        tokenId: value.card_token_id.toNumber(),
                        ...obj
                    };
                    resolve(card);
                }).catch(error => {
                    resolve(null);
                })
            } catch {
                resolve(null);
            }
          }
        })
    }

    useEffect(() => {
        const fetch_collection = async () => {
            const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);
            const nftStorage = await contract.storage();

            const tks = await tokenIDs();

            console.log(tks);

            const filter_promise = new Promise((resolve) => {
                const filtered_array = tks.filter((tk: any) => [auth.address].includes(tk.key.owner));
                const tk_ids = filtered_array.map((tk: any) => tk.key.token_id)
                resolve(tk_ids);
            });

            filter_promise.then(async (ids) => {
                const tokens = await nftStorage.token_information.getMultipleValues(ids);
                fetch_nfts(tokens);
            })
        }

        fetch_collection();
    }, [count])

    const fetch_nfts = (tokens: any) => {
        console.log(tokens);
        let promises: any = [];
        tokens.forEach((card: any) => promises.push(fetch_token_metadata(card)));
        Promise.all(promises).then(res => {
            const filtered_results = res.filter((el: any) => {
                return el !== null
            })

            if (filtered_results.length === 0) {
                setCount(count + 1);
            } else {
                setNFTs(filtered_results);
                setLoading(false);
            }
        })
    }

    const tokenIDs = async () => {
        // https://api.florencenet.tzkt.io/v1/bigmaps/139825/values
        try {
            const response = await fetch('https://api.florencenet.tzkt.io/v1/bigmaps/139825/keys');
            const resJson = await response.json(); 
            return resJson;
        } catch {
            setCount(count + 1);
        }
    };

    return (
        <Layout pageTitle="Anime Art Collection">
            <NFTList owned={true} NFTs={NFTs} loading={loading} />
        </Layout>
    )
}