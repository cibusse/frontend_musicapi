import React, { useState, useEffect } from "react";
import axios from "axios";
import MusicForm from "./MusicForm.js";
import MusicTable from "./MusicTable.js";
import "./styles.css";

const App = () => {
  const [musicData, setMusicData] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    song_title: "",
    artist: "",
    album: "",
    genre: "",
    year: "",
  });
  const [searchCode, setSearchCode] = useState("");
  const [showTable, setShowTable] = useState(false);

  const API_BASE_URL = "http://localhost:3000/api";

  // Fetch all music data
  const fetchMusicData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getall`);
      setMusicData(response.data);
    } catch (err) {
      console.error("Error fetching music data", err);
    }
  };

  useEffect(() => {
    fetchMusicData();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const updatedData = { ...formData, [e.target.name]: e.target.value };
    console.log("Updated Form Data: ", updatedData); // Debugging
    setFormData(updatedData);
    /* setFormData({ ...formData, [e.target.name]: e.target.value }); */
  };

  // Handle search by code
  const handleSearchByCode = async () => {
    if (!searchCode) {
      alert("Please enter a code to search");
      return;
    }
    try {
      const response = await axios.get(`${API_BASE_URL}/${searchCode}`);
      setMusicData(response.data ? [response.data] : []);
    } catch (err) {
      console.error("Error searching by code", err);
      alert("Error searching by code");
    }
    
  };

  // Handle insert music
  const handleInsert = async () => {
    console.log("Attempting Insert:", formData); // Debugging
    try {
      await axios.post(`${API_BASE_URL}/add`, formData);
      alert("Music added successfully");
      fetchMusicData();
      setFormData({
        code: "",
        song_title: "",
        artist: "",
        album: "",
        genre: "",
        year: "",
      });
 
    } catch (err) {
      console.error("Error inserting music", err);
      alert("Error inserting music");
    }
  };

  
  // Handle update music
  const handleUpdate = async () => {
    const { code, ...updates } = formData;
    console.log("Attempting Update:", code, updates); // Debugging
    if (!code) {
      alert("Please enter the code of the music to update");
      return;
    }

    try {
      await axios.put(`${API_BASE_URL}/update/${code}`, updates);
      console.log("Submitting Update for Code:", formData.code, formData);
      alert("Music updated successfully");
      fetchMusicData();
      setFormData({
        code: "",
        song_title: "",
        artist: "",
        album: "",
        genre: "",
        year: "",
      });
    } catch (err) {
      console.error("Error updating music", err);
      alert("Error updating music");
    }
  };

  // Handle delete music
  const handleDelete = async () => {
    if (!searchCode) {
      alert("Please enter the code of the music to delete");
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/delete/${searchCode}`);
      alert("Music deleted successfully");
      fetchMusicData();
      setSearchCode(""); // Clear the search input
      setFormData({
        code: "",
        song_title: "",
        artist: "",
        album: "",
        genre: "",
        year: "",
      });
    } catch (err) {
      console.error("Error deleting music", err);
      alert("Error deleting music");
    }
  };


  // Handle search all
  const handleSearchAll = () => {
    setShowTable(true);
  };

  return (
    <div className="App">
      <h3>Search music data</h3>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Insert code"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
        />
        <button onClick={handleSearchByCode} className="search-btn">Submit</button>
        <button onClick={handleSearchAll} className="search-all-btn">Search All</button>
        <button
            type="button"
            className="delete-btn"
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to delete this record?"
                )
              ) {
                handleDelete(searchCode.code);
              }
            }}
          >
            Delete
          </button> 
      </div>

      {/* Music Form */}
      <MusicForm
        formData={formData}
        handleChange={handleChange}
        handleInsert={handleInsert}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      <p></p>
      {/* Music Table */}
      {showTable && <MusicTable musicData={musicData.sort((a, b) => a.code - b.code)} />}
    </div>
  );
};

export default App;
