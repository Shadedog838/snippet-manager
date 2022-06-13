import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Snippet from "./Snippet";
import SnippetEditor from "./SnippetEditor";
import "./Home.scss";
import UserContext from "../../context/UserContext";
import domain from "../../util/domain";

function Home() {
  const [snippets, setSnippets] = useState([]);
  const [snippetEditorOpen, setSnippetEdditorOpen] = useState(false);
  const [editSnippetData, setEditSnippetData] = useState(null);

  const { user } = useContext(UserContext);

  useEffect(() => {
    // get snippets
    if (!user) {
      setSnippets([]);
      return;
    }
    getSnippets();
  }, [user]);

  async function getSnippets() {
    const snippetRes = await axios.get(`${domain}/snippet/`);
    setSnippets(snippetRes.data);
  }

  function editSnippet(snippetData) {
    setEditSnippetData(snippetData);
    setSnippetEdditorOpen(true);
  }

  function renderSnippets() {
    let sortedSnippets = [...snippets];
    sortedSnippets = sortedSnippets.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return sortedSnippets.map((snippet, i) => {
      return (
        <Snippet
          key={i}
          snippet={snippet}
          getSnippets={getSnippets}
          editSnippet={editSnippet}
        />
      );
    });
  }

  return (
    <div className="home">
      {!snippetEditorOpen && user && (
        <button
          className="btn-editor-toggle"
          onClick={() => setSnippetEdditorOpen(true)}
        >
          Add snippet
        </button>
      )}
      {snippetEditorOpen && (
        <SnippetEditor
          setSnippetEdditorOpen={setSnippetEdditorOpen}
          getSnippets={getSnippets}
          editSnippetData={editSnippetData}
        />
      )}
      {snippets.length > 0
        ? renderSnippets()
        : user && (
            <p className="no-snippets-msg">No snippets have been added yet</p>
          )}
      {user == null && (
        <div className="no-user-message">
          <h2>Welcome to Snippet manager</h2>
          <Link to="/register">Register here</Link>
        </div>
      )}
    </div>
  );
}

export default Home;
