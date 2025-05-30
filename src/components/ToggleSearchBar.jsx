import { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";

const ToggleSearchBar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState("");

  const toggleSearch = () => {
    setShowSearch((prev) => !prev);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search:", searchText);
  };

  return (
    <>
      {showSearch && (
        <Form onSubmit={handleSearch} className="me-1">
          <InputGroup>
            <Form.Control type="text" placeholder="Search circle" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
            <Button type="submit" variant="outline-success" onClick={toggleSearch}>
              <Search />
            </Button>
          </InputGroup>
        </Form>
      )}
      {!showSearch && (
        <Button variant="outline-success" className="border border-0 me-3" onClick={toggleSearch}>
          <Search />
        </Button>
      )}
    </>
  );
};

export default ToggleSearchBar;
