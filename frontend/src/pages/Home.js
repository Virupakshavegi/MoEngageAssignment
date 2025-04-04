import React, { useState } from "react";
import { useListsContext } from "../hooks/useListContext";
import Card from "./Card";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

const httpStatusCodes = [
  100, 101, 102, 103, 200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 300,
  301, 302, 303, 304, 305, 307, 308, 400, 401, 402, 403, 404, 405, 406, 407,
  408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424,
  425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508,
  510, 511,
];

const Container = styled.div`
  text-align: center;
  padding: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  width: 250px;
  margin-bottom: 20px;
  font-size: 16px;
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
`;

const SaveButton = styled.button`
  background-color: blue;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  margin-top: 10px;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: darkblue;
  }
`;

const Home = () => {
  const [search, setSearch] = useState("");
  const [listName, setListName] = useState("");
  const { user } = useAuthContext();

  const { dispatch } = useListsContext();
  const navigate = useNavigate();

  const filterStatusCodes = (query) => {
    if (!query) return httpStatusCodes;
    return httpStatusCodes.filter((code) => code.toString().startsWith(query));
  };

  const filteredCodes = filterStatusCodes(search);

  const handleSaveList = async () => {
    if (!listName) {
      alert("Please enter a list name!");
      return;
    }

    const newList = { name: listName, codes: filteredCodes };

    try {
      const response = await fetch("/api/lists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(newList),
      });

      const savedList = await response.json();

      if (response.ok) {
        dispatch({ type: "CREATE_LIST", payload: savedList });
        navigate("/lists");
      } else {
        alert(savedList.error);
      }
    } catch (error) {
      console.error("Error saving list:", error);
    }
  };

  return (
    <Container>
      <h1>HTTP Status Code Search</h1>
      <SearchInput
        type="text"
        placeholder="Search HTTP codes"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <ImageGrid>
        {filteredCodes.map((code) => (
          <Card key={code} code={code} />
        ))}
      </ImageGrid>

      {/* Save List Input & Button */}
      <div>
        <input
          type="text"
          placeholder="Enter list name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <SaveButton onClick={handleSaveList}>Save List</SaveButton>
      </div>
    </Container>
  );
};

export default Home;
