import type { NextPage } from 'next'
import Head from 'next/head'
import Container from '../components/Layouts/Container'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Jeopardee</title>
        <meta name="description" content="Jeopardy for your friends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <Container className="text-white">
          <h1 className="text-shadow text-5xl font-black leading-relaxed">Welcome to Jeopardee</h1>
          <p className='text-lg'>Play with your friends!</p>
          <button className="my-4 border px-6 py-2">Start</button>
        </Container>
    </div>
  )
}

export default Home
