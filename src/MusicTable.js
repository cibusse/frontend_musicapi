
import React from "react";
import "./tablestyles.css";

const MusicTable = ({ musicData}) => {
  return (

    <div>
      <table className="music-table-container">
        <thead>
          <tr>
          <th className="code">Code</th>
            <th className="song-title">Song Title</th>
            <th className="artist">Artist</th>
            <th className="album">Album</th>
            <th className="genre">Genre</th>
            <th className="year">Year</th>
          </tr>
        </thead>
        <tbody>
          {musicData.map((music) => (
            <tr key={music.code}>
           <td className="code">{music.code}</td>
              <td className="song-title">{music.song_title}</td>
              <td className="artist">{music.artist}</td>
              <td className="album">{music.album}</td>
              <td className="genre">{music.genre}</td>
              <td className="year">{music.year}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  );
};

export default MusicTable;