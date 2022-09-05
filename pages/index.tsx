import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import homeStyles from '../styles/Home.module.css'
import { getSortedPostData } from '../lib/posts'
import { GetStaticProps } from 'next'

const Home = ({ allPostsData }: {
  allPostsData: {
    date: string
    title: string
    id: string
  }[]
}) => {
  return (
    <div>
      <Head>
        <title>LJE</title>
      </Head>
      <section className={homeStyles.headingMd}>
        <p>[LJE Introduction]</p>
        <p>(This is a website)</p>
      </section>
      <section className={'${homeStyles.headingMd} ${homeStyles.padding1px}'}>
        <h2 className={homeStyles.headingLg}>Blog</h2>
        <ul className={homeStyles.list}>
          {allPostsData.map(({ id, title, date }) =>
            <li className={homeStyles.listItem} key={id}>
              <Link href={'/posts/${id}'}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={homeStyles.lightText}>
                {date}
              </small>
            </li>

          )}

        </ul>
      </section>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostData()
  console.log("getStaticPaths : " + allPostsData)
  return {
    props: {
      allPostsData
    }
  }

}