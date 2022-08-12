import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {Container, Card} from "@mantine/core";
import Demo from "./components/AppShell";

const Home: NextPage = () => {
  return (
    <div>
      {/*<Head>*/}
      {/*  <title>Wahlstrand</title>*/}
      {/*  <link rel="icon" href="/favicon.ico" />*/}
      {/*</Head>*/}

        <Demo/>
    </div>
  )
}

export default Home
