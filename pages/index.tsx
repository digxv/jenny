import { Card, Text } from '@geist-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Layout from '../components/Layout'

const Index: NextPage = () => {
  return (
    <Layout pageTitle="Jenny">
       <div style={{
         marginTop: "15px"
       }} className="container-sect">
            <div className="box" > 
              <h1 className="jenny-h1 glitch">JENNY</h1>
            </div>
            <div className="box stack-top" >
                <img className="lp-img" src="https://i.imgur.com/srsBXCr.png" alt="animechar" />
            </div>
        </div>
        <h2 style={{textAlign: "center"}} className="quotedtext">Your <span className="highlighted-text"> ANIME NFT</span> Collection</h2> 
    </Layout>
  )
}
export default Index
