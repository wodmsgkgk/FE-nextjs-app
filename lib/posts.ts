import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkHtml from 'remark-html'

const postDirectory = path.join(process.cwd(), 'posts')
console.log('')

export function getSortedPostData() {
    console.log("getSortedPostData")
    const fileNames = fs.readdirSync(postDirectory)

    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')

        const fullPath = path.join(postDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        const matterResult = matter(fileContents)

        return {
            id,
            ...matterResult.data as { date: string; title: string }
        }
    })

    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllPostIds() {
    // console.log("getAllPostIds")
    const fileNames = fs.readdirSync(postDirectory)

    return fileNames.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id: string) {
    // console.log("getPostData : " + id)
    const fullPath = path.join(postDirectory, id + '.md')
    // console.log("getPostData : " + fullPath)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    const matterResult = matter(fileContents)

    const processedContent = await remark()
        .use(remarkHtml)
        .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
        id,
        contentHtml,
        ...(matterResult.data as { date: string; title: string })
    }
}