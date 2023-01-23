import Post from "../../components/Posts/Post/Post";
import ContentLayout from "../../components/Layouts/ContentLayout/ContentLayout";
import { useEffect, useState } from "react";
import { getPosts } from "../../core/posts/posts";
import PublishInput from "../../components/Posts/PublishInput/PublishInput";
import getUsernameFromEmail from "../../core/utils/getUsernameFromEmail";
import HomeHeader from "../../components/Pages/HomeHeader/HomeHeader";

// Home Component
const Home = () => {
  const [posts, setPosts] = useState([]);

  const loadPost = () => {
    getPosts((data: any) => {
      setPosts(data);
    });
  };

  useEffect(() => loadPost(), []);

  return (
    <div className="home--background">
      <ContentLayout>
        <HomeHeader />
        <PublishInput reloadPost={loadPost} />

        {posts
          .sort((postA: any, postB: any) => {
            return (
              new Date(postB.createdAt).getTime() -
              new Date(postA.createdAt).getTime()
            );
          })
          .map((post: any, index) => (
            <Post
              post={post}
              username={getUsernameFromEmail(post.author.email)}
              key={index}
              reloadPost={loadPost}
            />
          ))}
      </ContentLayout>
    </div>
  );
};
export default Home;
