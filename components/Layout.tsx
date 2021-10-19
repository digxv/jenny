import Header from "./Header";
import Head from "next/head";
import Footer from "./Footer";

export default function Layout(props: any) {
    return (
        <div>
            <Head>
                <title>{props.pageTitle}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>

            <Header colorfulBorder={true} />

            <div className="content" style={{
                maxWidth: "1500px",
                marginRight: "auto",
                marginLeft: "auto",
                height: "100vh"
            }}>
                {props.children}   
            </div>
            {/* <Footer /> */}
        </div>
    )
}