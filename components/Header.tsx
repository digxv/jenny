import {Grid, Text, ButtonDropdown, ButtonGroup, Button, Dot, useTheme, Link as GeistLink, Avatar} from "@geist-ui/react";
import { useRouter } from "next/router";
import { LogIn, LogOut } from "@geist-ui/react-icons";
import { AuthContext } from "../helpers/AuthContext";
import { useContext, useEffect, useState } from "react";
import { TezosContext } from "../helpers/TezosContext";
import { DAppClient, NetworkType } from "@airgap/beacon-sdk";
import Link from "next/link";

export default function Header({colorfulBorder}: any) {

    const router = useRouter();
    const { palette } = useTheme();

    const [auth, setAuth]: any = useContext(AuthContext);
    const Tezos: any = useContext(TezosContext);

    const [templeWallet, setTempleWallet]: any = useState(null);


    useEffect(() => {
        const dappClient =  new DAppClient({ name: "Beacon", preferredNetwork: NetworkType.FLORENCENET });

        connectWallet(dappClient);
    }, []);

    const connectWallet = async (dappClient: any) => {
        const activeAccount = await dappClient.getActiveAccount();
        if (activeAccount) {
            setAuth({
                ...auth,
                isConnected: true,
                address: activeAccount.address
            })
        } else {
            const permissions = await dappClient.requestPermissions({
                network: {
                    type: NetworkType.FLORENCENET,
                    rpcUrl: "https://florencenet.smartpy.io"
                }
            });
            setAuth({
                ...auth,
                isConnected: true,
                address: permissions.address
            })
        }
    }

    const handleDisconnect = async () => {
        const dappClient =  new DAppClient({ name: "Beacon", preferredNetwork: NetworkType.FLORENCENET });

        await dappClient.clearActiveAccount();
        
        setAuth({
            ...auth,
            dappClient: null,
            isConnected: false
        })
    }

    return (
        <div style={{
            backgroundColor: "#fff"
        }}>
            {colorfulBorder ? <div className="header-border" /> : null}
            <div style={{
                backgroundColor: "#f5f5f5",
                textAlign: "center",
                fontSize: "14px",
                padding: "2px"
            }}>
                <Text>Learn more about the upcoming game algorithm <GeistLink style={{
                    color: palette.purple,
                    fontWeight: "bold"
                }} href="https://iced-dryosaurus-255.notion.site/Jenny-manual-f3dff6e5744b4087b9ea29df32d98289">here</GeistLink>.</Text>
            </div>
            <div className="header-width">
                <Grid.Container
                    className="content"
                >
                    <Grid
                        xs={12}
                        justify="flex-start"
                    >
                        <Text
                            h2
                            className="brand-text"
                        ><Link href="/"><span style={{color: "#000", cursor: "pointer"}}>jenny</span></Link></Text>
                        <Dot onClick={auth.isConnected ? handleDisconnect : () => {}} style={{ marginLeft: '10px', cursor: "pointer" }} type={auth.isConnected ? "success" : "error"} />
                    </Grid>
                    <Grid
                        xs={12}
                        justify="flex-end"
                        height="auto"
                    >
                        <Text className="other-header-options" pr="20px">
                            <GeistLink target="_blank" rel="noopener" href="/marketplace" icon>Marketplace</GeistLink>
                        </Text>

                        {auth.isConnected ? (
                            <>

                            <Text className="other-header-options" pr="20px">
                                <Link href="/collection">
                                    <span style={{
                                        color: "#000",
                                        fontSize: "18px",
                                        cursor: "pointer"
                                    }}>
                                        Collection
                                    </span>
                                </Link>
                            </Text>

                            <Link href="/play">
                                <Button
                                    // iconRight={<BiJoystick color="#fff" />}
                                    auto
                                    className="play-btn"
                                    style={{
                                        marginTop: "10px",
                                        backgroundColor: "#fc5c9c",
                                        color: "#fff",
                                        fontSize: "18px",
                                        paddingBottom: "5px",
                                        border: "2px solid #eb367f",
                                        borderBottomWidth: "5px",
                                        marginRight: "10px"
                                    }}
                                >Play</Button>
                            </Link>
                            <Button
                                className="play-btn"
                                style={{
                                    marginTop: "10px",
                                    backgroundColor: "#fc5c9c",
                                    color: "#fff",
                                    fontSize: "18px",
                                    paddingBottom: "5px",
                                    border: "2px solid #eb367f",
                                    borderBottomWidth: "5px",
                                }}
                            >
                                {auth.address.substr(0, 5)}...{auth.address.substr(-5, auth.address.length)}
                            </Button>
                            </>
                        ) : (
                            <Button
                                onClick={connectWallet}
                                className="play-btn"
                                style={{
                                    marginTop: "10px",
                                    backgroundColor: "#fc5c9c",
                                    color: "#fff",
                                    fontSize: "18px",
                                    paddingBottom: "5px",
                                    border: "2px solid #eb367f",
                                    borderBottomWidth: "5px",
                                }}
                                iconRight={<LogIn color="#fff" />}
                            >
                                Connect
                            </Button>
                        )}
                    </Grid>
                </Grid.Container>
            </div>
        </div>
    )
}