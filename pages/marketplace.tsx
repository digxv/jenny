import { Grid, Card, Text, Spinner } from "@geist-ui/react";
import { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import NFTListCard from "../components/NFTListCard";
import { AuthContext } from "../helpers/AuthContext";
import { TezosContext } from "../helpers/TezosContext";
import { bytes2Char } from "@taquito/utils";
import {compose, MichelsonMap} from "@taquito/taquito";
import {tzip12, Tzip12Module} from "@taquito/tzip12";
import { CONTRACT_ADDRESS, marketActiveKeys, sanitizeJsonUri } from "../helpers/utils";
import NFTList from "../components/NFTList";

export default function Marketplace() {

    const Tezos: any = useContext(TezosContext);

    const [auth, setAuth]: any = useContext(AuthContext);
    const [NFTs, setNFTs]: any = useState([]);
    const [NFTsAlt, setNFTsAlt]: any = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      market()
    }, []);

    const market = async () => {
      const keys = await marketActiveKeys();

      const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);
      const nftStorage = await contract.storage();

      const market = await nftStorage.market.getMultipleValues(keys);

      let market_entries: any = [];
      let ids: any = [];

      market.forEach((value: any, key: any) => {
        if(value !== undefined) {

          market_entries.push({
            tokenId: key,
            sale_value: value.sale_value,
            seller: value.seller
          })

          ids.push(key);
        }
      })

      market_entries.reverse();
      const cards = await nftStorage.token_information.getMultipleValues(ids);

      function get_token_info(value: any) {
        return new Promise((resolve) => {
          if (value !== undefined) {
            try {
              fetch(sanitizeJsonUri(value.ipfs_hash))
              .then(res => res.json())
              .then(obj => {
                const card = {
                  tokenId: value.card_token_id.toNumber(),
                  sale_value: value.sale_value,
                  seller: value.seller,
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

      const promises: any = [];

      cards.forEach((value: any, index: number) => {
        const tMarketEntry = market_entries.find((o: any) => o.tokenId === `${value.card_token_id.toNumber()}`);

        if (tMarketEntry !== undefined) {
          const nVal: any = {
            ...value,
            seller: tMarketEntry.seller,
            sale_value: tMarketEntry.sale_value
          }
  
          promises.push(get_token_info(nVal));
        }
      })

      Promise.all(promises).then((results) => {

        const filtered_results = results.filter((el: any) => {
          return el !== null
        })

        setNFTs(filtered_results);
        setLoading(false);
      })
    }

    return (
        <Layout pageTitle={"Jenny Marketplace"}>
          <NFTList owned={false} loading={loading} NFTs={NFTs} />
        </Layout>
    )
}