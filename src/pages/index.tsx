import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { OpenAIPosts } from '@prisma/client'
import Masonry from 'react-masonry-css'
const inter = Inter({ subsets: ['latin'] })

interface HomeProps {
  data: OpenAIPosts[]
}

export default function Home(props: HomeProps) {
  return (
    <>
      <Head>
        <title>Community Creation</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className='p-8'>
        <div className='max-w-7xl mx-auto mt-9 text-center'>
          <h1 className='text-5xl text-gray-800 font-bold'>Community Creation</h1>
          <p className='text-2xl mt-5 text-gray-600'>Create your own by filling in the form in one of the other pages</p>
        </div>

        <Masonry
          breakpointCols={3}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column">

          {props?.data.length > 0 && props.data.map((item) => (
            <div key={item.id} className='bg-gray-900   mt-8 rounded-2xl group pb-4 '>
              <div className='bg-gray-700 p-3 rounded-2xl'>
                <h2 className='text-base text-gray-300 '>{item.prompt}</h2>
                <p className='text-gray-300 p-2 rounded-md my-4 bg-[#7176ff] inline-block'>{item.category}</p>
                <p className='text-[#b1b3f7]'>{item.userName}</p>
              </div>
              <div className='px-4'>

                <p className='text-base text-gray-300 whitespace-pre-wrap'>{item.response}</p>
              </div>
            </div>
          ))

          }
        </Masonry>


      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get('http://localhost:3000/api/get-data')

  if (!res.data) {
    return {
      props: {
        data: []
      }
    }
  }

  return {
    props: {
      data: res.data
    }
  }
}
