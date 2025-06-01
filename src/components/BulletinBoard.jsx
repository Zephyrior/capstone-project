import { useEffect } from "react";
import { PinAngle } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchBulletinPostsAction } from "../redux/actions";
import { Image } from "react-bootstrap";

const BulletinBoard = () => {
  const dispatch = useDispatch();
  const bulletinPosts = useSelector((state) => state.bulletinPosts.bulletinPosts);
  const posts = bulletinPosts?.content || [];
  console.log("posts: ", posts);

  useEffect(() => {
    dispatch(fetchBulletinPostsAction());
  }, [dispatch]);

  return (
    <>
      <div className="border border-1 rounded-3 p-3" style={{ background: "#E5F5E0" }}>
        <h3>Your Bulletin Board 📌</h3>
        {posts.length === 0 ? (
          <p>No posts yet. 😢</p>
        ) : (
          posts.map((post) => (
            <div key={post.id}>
              <p>{post.content}</p>
              <Image src={post.mediaUrl} />
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default BulletinBoard;
