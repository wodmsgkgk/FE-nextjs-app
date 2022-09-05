import React from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPostIds, getPostData } from '../../lib/posts'
import homeStyles from '../../styles/Home.module.css'
import Head from 'next/head'

export const Post = ({ postData }: {
    postData: {
        title: string
        date: string
        contentHtml: string
    }
}) => {
    return (
        <div>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={homeStyles.headingXl}>{postData.title}</h1>
                <div className={homeStyles.lightText}>
                    {postData.date}
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </div>
    )
}

export default Post

export const getStaticPaths: GetStaticPaths = async () => {
    // console.log("getStaticPaths start")
    const paths = getAllPostIds()
    // console.log("getStaticPaths : " + paths.at(0)?.params.id)

    return {
        paths,
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    // console.log("getStaticProp : " + params?.id)
    const postData = await getPostData(params?.id as string)
    // console.log("getStaticProp : " + postData?.title)
    return {
        props: {
            postData
        }
    }
}
