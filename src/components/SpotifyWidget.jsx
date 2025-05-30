import { useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";

const SpotifyWidget = () => {
  const [playListId, setPlayListId] = useState(() => {
    return localStorage.getItem("spotifyPlayListId") || "37i9dQZF1DXcBWIGoYBM5M";
  });

  const playListUrl = `https://open.spotify.com/embed/playlist/${playListId}?utm_source=generator`;
  const [newPlayListId, setNewPlayListId] = useState(playListId);
  const [showModal, setShowModal] = useState(false);

  const handleSetPlayList = (e) => {
    e.preventDefault();

    setPlayListId(newPlayListId);
    localStorage.setItem("spotifyPlayListId", newPlayListId);
    setShowModal(false);
  };

  return (
    <div className="border p-3 rounded shadow-sm mb-3" style={{ background: "#fff" }}>
      <div className="d-flex justify-content-between">
        <h5 className="mb-0">🎧 Now Playing</h5>
        {/*         <Button variant="link" style={{ textDecoration: "none", color: "black" }} className="p-0 mb-2">
          <PencilSquare />{" "}
        </Button> */}

        <Dropdown>
          <Dropdown.Toggle variant="link" style={{ textDecoration: "none", color: "black" }} className="p-0 mb-2">
            <PencilSquare />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item as="button" onClick={() => setShowModal(true)} style={{ background: "none" }}>
              Set Playlist
            </Dropdown.Item>
            <Dropdown.Item as="button" style={{ background: "none" }}>
              Remove Widget
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <iframe
        style={{ borderRadius: "12px" }}
        src={playListUrl}
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>

      <Modal show={showModal} onHide={() => setShowModal(false)} aria-labelledby="playlist-modal" centered>
        <Modal.Header style={{ background: "#E5F5E0" }} className="p-2" closeButton>
          <Modal.Title id="playlist-modal" className="w-100 text-center">
            Set playlist url
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center justify-content-center">
            <p className="mb-0 me-1">https://open.spotify.com/playlist/</p>
            <Form onSubmit={handleSetPlayList}>
              <Form.Group>
                <Form.Control type="text" placeholder="Enter playlist id" value={newPlayListId} onChange={(e) => setNewPlayListId(e.target.value)} />
              </Form.Group>
            </Form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default SpotifyWidget;
