import Head from 'next/head'
import { useMetadataRenderer } from 'utils/metadata'
import LandingPage from 'components/LandingPage'
import { PostItem, posts } from 'utils/posts'
import { langs } from 'texts'

export default ({ postData }: { postData: PostItem }) => {
  const renderMetadata = useMetadataRenderer()
  return (
    <>
      <Head>
        {renderMetadata({
          title: postData.imageAlt,
          image: postData.image,
        })}
      </Head>
      <LandingPage />
    </>
  )
}

export async function getStaticProps({ params }: any) {
  const postData = posts.find((p) => p.segment === params.segment.toLowerCase().trim())
  return {
    props: {
      postData,
    },
  }
}

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: langs
      .map((lang) =>
        posts.map(({ segment }) => ({
          params: { segment, lang },
        }))
      )
      .flat(),
  }
}
