const SpotifyWidget = () => {
  return (
    <div className="border p-3 rounded shadow-sm mb-3" style={{ background: "#fff" }}>
      <h5>🎧 Now Playing</h5>
      <iframe
        style={{ borderRadius: "12px" }}
        src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator"
        width="100%"
        height="152"
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default SpotifyWidget;
