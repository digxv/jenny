import { Button, Card, Image, Input, Tag, Text, Modal, Collapse, useToasts } from "@geist-ui/react";
import { useContext, useState } from "react";
import { AuthContext } from "../helpers/AuthContext";
import { NFTContext } from "../helpers/NFTContext";
import { CONTRACT_ADDRESS } from "../helpers/utils";
import { TezosOperationType } from "@airgap/beacon-sdk";
import { DAppClient, NetworkType } from "@airgap/beacon-sdk";
import { TezosContext } from "../helpers/TezosContext";

export default function NFTListCard(props: any) {

    const [Tezos, setTezos]: any = useContext(TezosContext);
    const [NFT, setNFT]: any = useContext(NFTContext);
    const [auth, setAuth]: any = useContext(AuthContext);
    const [, setToast] = useToasts();

    // resell state
    const [resellModal, setResellModal] = useState(false);
    const [resellPrice, setResellPrice] = useState(0);
  
    const buyNFT = async () => {
      const dappClient =  new DAppClient({ name: "Beacon", preferredNetwork: NetworkType.FLORENCENET });

      try {
          const result = await dappClient.requestOperation({
            operationDetails: [
              {
                kind: TezosOperationType.TRANSACTION,
                amount: `${props.sale_value.toNumber()}`,
                destination: CONTRACT_ADDRESS,
                parameters: {
                  entrypoint: "buy",
                  value: {
                    int: `${props.tokenId}`,
                  },
                },
              },
            ],
          });
          
          setToast({
              text: `${props.name} is now in your collection!`,
              type: "success"
          })
      } catch (error) {
          setToast({
              text: "Unable to buy this NFT",
              type: "error"
          })
      }
    }

    const addToMarket = async () => {
      const dappClient =  new DAppClient({ name: "Beacon", preferredNetwork: NetworkType.FLORENCENET });

      try {
          const result = await dappClient.requestOperation({
            operationDetails: [
              {
                kind: TezosOperationType.TRANSACTION,
                amount: "0",
                destination: CONTRACT_ADDRESS,
                parameters: {
                  entrypoint: "add_to_market",
                  value: {
                    prim: "Pair",
                    args: [
                      {
                        int: `${resellPrice}`
                      },
                      {
                        int: `${props.tokenId}`
                      }
                    ]
                  }
                },
              },
            ],
          });
          
          setToast({
              text: `${props.name} is now added to market!`,
              type: "success"
          })

          setResellModal(false)
      } catch (error) {
          setToast({
              text: "Unable to add NFT to market.",
              type: "error"
          })
      }
    }

    return (
        <Card width="400px">
            <Image onError={(e: any)=> {
              e.target.onerror = null;
              e.target.src="https://gateway.pinata.cloud/ipfs/QmQfvWHw3xfPhcCFxsTWZE1PGfKty9WrKvBZanqcEkzYsK"
            }} src={props.imageSrc} width="100%" draggable={false} />
            <Text h4 mt="0" mb={0}>
                {props.name}
                {props.type === "Character" && <Tag ml="5px" invert type="warning">Character</Tag>}
            </Text>
            <Text type="secondary" small>{props.description}</Text>
            <br />
            <Text type="success" small>{`${props.creators[0].substr(0, 6)}...${props.creators[0].substr(-6, props.creators[0].length)}`}</Text>

            {props.owned ? null : <Button onClick={buyNFT} width="100%" mt="20px" type="success-light">{props.sale_value.toNumber()} TEZ</Button>}
            {props.owned ? <Button onClick={() => setResellModal(!resellModal)} width="100%" mt="20px" type="success-light">Add To Market</Button> : null}

            <Modal visible={resellModal} onClose={() => setResellModal(!resellModal)}>
                <Modal.Content>
                  <Image onError={(e: any)=> {
                    e.target.onerror = null;
                    e.target.src="https://gateway.pinata.cloud/ipfs/QmQfvWHw3xfPhcCFxsTWZE1PGfKty9WrKvBZanqcEkzYsK"
                  }} src={props.imageSrc} width="100%" mb={2} draggable={false} />
                  <Input onChange={(e:any) => setResellPrice(e.target.value)} placeholder="Price (TEZ)" scale={4/3} width={"100%"} />
                  <Button onClick={() => addToMarket()} width="100%" mt="20px" type="success-light">Add To Market</Button>
                </Modal.Content>
            </Modal>
        </Card>
    )
}