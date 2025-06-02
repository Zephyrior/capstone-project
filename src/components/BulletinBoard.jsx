import { useEffect } from "react";
import { PinAngle, ThreeDots } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { fetchBulletinPostsAction } from "../redux/actions";
import { Button, Col, Container, Dropdown, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CommentAndLikeSection from "./CommentAndLikeSection";
import BulletinPost from "./BulletinPost";

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
        <h3 className="mb-4">Your Bulletin Board 📌</h3>
        {posts.length === 0 ? <p>No posts yet. 😢</p> : posts.map((post) => <BulletinPost key={post.id} post={post} />)}
      </div>
    </>
  );
};

export default BulletinBoard;
