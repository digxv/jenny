import { bytes2Char } from "@taquito/utils";
import { useContext } from "react";
import { TezosContext } from "./TezosContext";

export const CONTRACT_ADDRESS = "KT1ByJAPmjqY2aDobZRCEgccdaxSidAs1ZPA"
export const INDEXER_NETWORK = "florencenet"

export const sanitizeJsonUri = (origin: any): any => {
    if (origin.startsWith('ipfs://')) {
      return `https://gateway.pinata.cloud/ipfs/${origin.substring(7)}/`;
    } else {
      let chars = bytes2Char(origin);
      return `https://gateway.pinata.cloud/ipfs/${chars.substring(7)}/`
    }
  
    return null;
}

export const marketActiveKeys = async () => {
  try {
    const response = await fetch(
      `https://api.better-call.dev/v1/contract/${INDEXER_NETWORK}/${CONTRACT_ADDRESS}/storage`,
    );

    const result = await response.json();
    const market = result[0].children.find(
      // (elm: any) => elm.name === 'token_metadata',
      (elm: any) => elm.name === 'market',
    );

    const marketData = await fetch(
      `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${market.value}`,
    );
    const marketDataJSON = await marketData.json();
    console.log(marketDataJSON);

    const num_keys: number = marketDataJSON.active_keys;
    console.log(`active_keys: ${num_keys}`);
    const all_entries = [];
    let tk;

    for (let i = 0; i < parseInt(`${num_keys / 10}`) + 1; i++) {
      tk = await fetch(
        `https://api.better-call.dev/v1/bigmap/${INDEXER_NETWORK}/${
          market.value
        }/keys?offset=${10 * i}`,
      );
      let entries_array = await tk.json();
      console.log("keys", entries_array);
      all_entries.push(...entries_array);
      console.log('all_entries', all_entries.length);
      if (all_entries.length == num_keys) break;
    }

    if (typeof all_entries === 'undefined' || all_entries.length <= 0) {
      console.log('returning empty');
      return [];
    }

    let keys_arr: any = [];

    all_entries.forEach((item, index) => {
      keys_arr.push(item.data.key.value);
    })

    return keys_arr;
    
  } catch (error) {
    console.log(error);
  }
}

// fetch_market is not being used as of now as it depends on some context accessible only through react components
export const fetch_market = async (Tezos: any, keys: any) => {
  const contract = await Tezos.wallet.at(CONTRACT_ADDRESS);
  const nftStorage = await contract.storage();

  const market = await nftStorage.market.getMultipleValues(keys);

  let market_entries: any = [];
  let ids: any = [];

  market.forEach((value: any, key: any) => {
    if(value !== undefined){
      market_entries.push({
        token_id: keys[key],
        ...value
      })

      ids.push(key);
    }
  })

  const cards = await nftStorage.token_information.getMultipleValues(ids);


  function get_token_info(value: any) {
    return new Promise((resolve) => {
      if (value !== undefined) {
        fetch(sanitizeJsonUri(value.ipfs_hash))
          .then(res => res.json())
          .then(obj => {
            const card = {
              tokenId: value.card_token_id.toNumber(),
              ...obj
            };
            resolve(card);
          }).catch(error => {
            return null
          })
      }
    })
  }

  const promises: any = [];

  cards.forEach((value: any, index: number) => {
    promises.push(get_token_info(value));
  })

  Promise.all(promises).then((results) => {
    console.log(results);
    return results;
  })
}