import { Container } from "react-bootstrap";
import UserInfo from "./UserInfo";
import PostsPage from "./PostsPage";
import WidgetsPage from "./WidgetsPage";

const Home = () => {
  return (
    <>
      <Container>
        <UserInfo />
        <PostsPage />
        <WidgetsPage />
      </Container>
    </>
  );
};

export default Home;
