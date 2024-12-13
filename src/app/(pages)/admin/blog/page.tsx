import { Metadata } from 'next'
import PostsList from './list/postsList';

export const metadata: Metadata = {
  title: "Blog Page | OnlineMarket add blog page",
  description: "This is Blog Page for OnlineMarket application",
};

export default function posts() {
  return (
    <>
      <PostsList/>
    </>
  )
}
