import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'


type Data = {
  downloads: number,
  commits: number
}

const packages: string[] = [
  'react-native-mmkv',
  'react-native-vision-camera',
  'react-native-blurhash',
  'react-native-editor',
  'react-native-safe-area-context'
]

// scoped npm packages are not supported inn bulk query 
const scopedPackages: string[] = [
  '@gorhom/bottom-sheet',
  '@gorhom/animated-tabbar',
  '@gorhom/portal'
]

const ghAccounts: { readonly [username: string]: number } = {
  mrousavy: 1,
  Szymon20000: 1,
  'thomas-coldwell': 1,
  chrispader: 1,
  janicduplessis: 3,
  akinncar: 1,
  gorhom: 1,
  ericvicent: 1,
  mateioprea: 1
}

const ghAuthUsername = process.env['GITHUB_USERNAME'] || ''
const ghAuthToken = process.env['GITHUB_PERSONAL_ACCESS_TOKEN'] || ''

async function getNumberOfDownloads() {
  try {
    // for bunk query, the max limit is 365 days 
    const start = new Date(+new Date() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    const end = new Date().toISOString().split('T')[0]
    const period = `${start}:${end}`

    const baseUrl = `https://api.npmjs.org/downloads/point/${period}`
    const url = `${baseUrl}/${packages.join(',')}`
    const { data: stats } = await axios.get(url)
    for (const scopedPackage of scopedPackages) {
      const { data } = await axios.get(`${baseUrl}/${scopedPackage}`)
      // console.log(data)
      /* {  downloads: 29152,
         start: '2021-09-05',
         end: '2022-09-05',
         package: '@gorhom/animated-tabbar'
       } */
      stats[scopedPackage] = data
    }
    console.log(stats)
    const downloads = Object.keys(stats).reduce((num, key) => num + stats[key].downloads, 0)
    return downloads

  } catch (error) {
    console.error(error)
    return 0
  }
}

async function getNumberOfCommits() {
  try {
    const baseUrl = 'https://api.github.com/repos/facebook/react-native/commits'
    let num = 0
    await Promise.all(
      Object.keys(ghAccounts).map(async username => {
        const perPage = 100
        const startPage = ghAccounts[username]
        num += (startPage - 1) * perPage
        for (let page = startPage; page < 100; ++page) {
          const { data: commits } = await axios.get(baseUrl, {
            params: {
              author: username,
              since: '2000-01-01', per_page: perPage,
              page
            },
            auth: {
              username: ghAuthUsername,
              password: ghAuthToken
            }
          })
          num += commits.length
          if (commits.length < perPage) break
        }
      })
    )
    return num
  } catch (error) {
    console.error(error)
    return 0
    // if (error.response) {
    //   console.log(error.response.data)
    //   console.log(error.response.status)
    //   console.log(error.response.headers)
    // } else f (error.request){
    //  // The request was made but no response was received
    //   console.log('Error in receiving any response: ', error.request)
    // } else {
    //   // Something happened in setting up the request that triggered an Error
    //   console.log('Error in making a request: ', error.message)
    // }
    // console.log(error.config)

  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const [downloads, commits] = await Promise.all([getNumberOfDownloads(), getNumberOfCommits()])

  res.setHeader('Cache-Control', 's-maxage=86400')
  res.status(200).json({
    downloads,
    commits
  })
}
