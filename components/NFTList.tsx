import { Grid, Spinner, Text } from "@geist-ui/react"
import { sanitizeJsonUri } from "../helpers/utils"
import NFTListCard from "./NFTListCard"

interface Props {
    loading: boolean,
    NFTs: any,
    owned: boolean
}

export default function NFTList(props: Props) {
    return (
      <Grid.Container mt="50px" gap={2} justify="center">
        {props.loading ? <div style={{
            textAlign: "center",
            marginTop: "100px"
          }}>
              <img src="https://firebasestorage.googleapis.com/v0/b/metalink-c9d12.appspot.com/o/animegirl.gif?alt=media&token=84155ce6-fdb0-495c-9d5a-364f6183aa93" />
              <Text style={{
                fontSize: "18px",
              }}>Loading...</Text>
          </div> : props.NFTs.map((item: any, index: number) => {
          return (
            <Grid key={index} xs={12} md={8} lg={6} xl={6}>
              <NFTListCard owned={props.owned} imageSrc={sanitizeJsonUri(item.artifactUri)} {...item} />
            </Grid>
          )
        })}
      </Grid.Container>
    )
}