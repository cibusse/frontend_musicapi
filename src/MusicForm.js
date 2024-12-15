import React from "react";
import "./styles.css";

const MusicForm = ({
  formData,
  handleChange,
  handleInsert,
  handleUpdate
}) => {
  return (
    <div className="music-form">
      <h3>Insert music data</h3>
      <form >
        <div>
          <input
            type="number"
            name="code"
            placeholder="Code"
            value={formData.code}
            onChange={handleChange}
            required
          />
          <p></p>
        </div>
        <div>
          <input
            type="text"
            name="song_title"
            placeholder="Song title"
            value={formData.song_title}
            onChange={handleChange}
          />
          <p></p>
        </div>
        <div>
          <input
            type="text"
            name="artist"
            placeholder="Artist"
            value={formData.artist}
            onChange={handleChange}
          />
          <p></p>
        </div>
        <div>
          <input
            type="text"
            name="album"
            placeholder="Album"
            value={formData.album}
            onChange={handleChange}
          />
          <p></p>
        </div>
        <div>
          <input
            type="text"
            name="genre"
            placeholder="Genre"
            value={formData.genre}
            onChange={handleChange}
          />
          <p></p>
        </div>
        <div>
          <input
            type="number"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
          />
          <p></p>
        </div>
        <p></p>
        <div>
          <button type="button" className="insert-btn" onClick={handleInsert}>
            Insert
          </button>
          <span>  </span>
          <button type="button" className="update-btn" onClick={handleUpdate}>
            Update
          </button>
        </div>
      </form>
      <p></p>
    </div>
  );
};

export default MusicForm;
