import { useEffect } from "react";
import { PinAngle, ThreeDots } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchBulletinPostsAction } from "../redux/actions";
import { Button, Col, Container, Dropdown, Image, Placeholder, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import CommentAndLikeSection from "./CommentAndLikeSection";
import BulletinPost from "./BulletinPost";
import InfiniteScroll from "react-infinite-scroll-component";

const BulletinBoard = () => {
  const dispatch = useDispatch();
  const bulletinPosts = useSelector((state) => state.bulletinPosts.bulletinPosts);
  const posts = bulletinPosts.content || [];
  const currentPage = bulletinPosts.number || 0;
  const isLastPage = bulletinPosts.last || false;
  //const posts = bulletinPosts?.content.filter((post) => post.profileOwnerId === null) || [];
  console.log("posts FE: ", posts);

  useEffect(() => {
    dispatch(fetchBulletinPostsAction(0));
  }, [dispatch]);

  const loadMorePosts = () => {
    const nextPage = currentPage + 1;
    dispatch(fetchBulletinPostsAction(nextPage, true));
  };

  return (
    <>
      <div className="border border-1 rounded-3 p-3" style={{ background: "#E5F5E0", overflow: "hidden" }}>
        <h3 className="mb-4">Bulletin Board 📌</h3>
        <InfiniteScroll
          dataLength={posts.length}
          next={loadMorePosts}
          hasMore={!isLastPage}
          loader={<Placeholder />}
          endMessage={<p className="text-muted, text-center mt-5">No more posts 📭</p>}
          style={{ overflow: "visible" }}
        >
          {posts.map((post) => (
            <BulletinPost key={post.id} post={post} />
          ))}
        </InfiniteScroll>
      </div>
    </>
  );
};

export default BulletinBoard;
