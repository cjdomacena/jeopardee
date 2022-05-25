import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Container from '../components/Layouts/Container'

const Home: NextPage = () => {
  return (
    <div className='h-full'>
      <Head>
        <title>Jeopardee</title>
        <meta name="description" content="Jeopardy for your friends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className="text-white h-full pt-12">
          <h1 className="text-shadow text-5xl font-black leading-relaxed">Welcome to Jeopardee</h1>
          <p className="text-lg mb-8">Play with your friends!</p>
          <Link href="/game">
            <a className='text-xl pt-4'>Begin</a>
          </Link>
      </Container>
    </div>
  );
}

export default Home
