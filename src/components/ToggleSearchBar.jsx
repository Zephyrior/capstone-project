import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { searchUserAction } from "../redux/actions";

const ToggleSearchBar = ({ toggleLogo }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearch = () => {
    //setShowSearch((prev) => !prev);
    toggleLogo();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    await dispatch(searchUserAction(searchText));
    setSearchText("");
    navigate(`/search/${searchText}`);

    setTimeout(() => {
      setShowSearch(false);
    }, 50);
  };

  return (
    <>
      {showSearch && (
        <Form onSubmit={handleSearch} className="me-1">
          <InputGroup>
            <Form.Control type="text" placeholder="Search circle" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <Button
              type="submit"
              variant="outline-success"
              onClick={() => {
                setShowSearch(true), toggleSearch();
              }}
            >
              <Search />
            </Button>
          </InputGroup>
        </Form>
      )}
      {!showSearch && (
        <Button
          variant="outline-success"
          className="border border-0 me-3"
          onClick={() => {
            setShowSearch(true), toggleSearch();
          }}
        >
          <Search />
        </Button>
      )}
    </>
  );
};

export default ToggleSearchBar;
