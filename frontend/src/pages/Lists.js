import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useListsContext } from "../hooks/useListContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import Card from "./Card";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const ListContainer = styled.div`
  background: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ListTitle = styled.h2`
  color: #1aac83;
  font-size: 24px;
  margin-bottom: 10px;
`;

const CreatedAt = styled.p`
  font-size: 14px;
  color: #222;
  margin-bottom: 15px;
  font-weight: bold;
  text-shadow:
    1px 1px 3px rgba(255, 255, 255, 0.6),
    0px 0px 5px rgba(255, 255, 255, 0.9);
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 15px;
`;

const EmptyMessage = styled.p`
  font-style: italic;
  color: gray;
  font-size: 16px;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
`;

const Button = styled.button`
  background-color: ${(props) => (props.delete ? "#e7195a" : "#007bff")};
  color: white;
  padding: 10px 15px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => (props.delete ? "#c4164a" : "#0056b3")};
  }
`;

const EditInput = styled.input`
  width: 80%;
  padding: 8px;
  font-size: 16px;
  margin-bottom: 10px;
`;

const Lists = () => {
  const { lists, dispatch } = useListsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [editingListId, setEditingListId] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchLists = async () => {
      if (!user) return;

      const response = await fetch("/api/lists", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_LISTS", payload: data });
      }
    };

    fetchLists();
  }, [dispatch, user]);

  const handleDelete = async (id) => {
    if (!user) return;

    const response = await fetch(`/api/lists/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (response.ok) {
      dispatch({ type: "DELETE_LIST", payload: id });
    }
  };

  const handleEdit = async (id) => {
    if (!user) return;

    const response = await fetch(`/api/lists/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ name: newName }),
    });

    if (response.ok) {
      const updatedList = await response.json();
      dispatch({ type: "UPDATE_LIST", payload: updatedList });
      setEditingListId(null);
      setNewName("");
    } else {
      console.error("Failed to update list");
    }
  };

  return (
    <Container>
      <h1>Saved Lists</h1>
      {lists.length === 0 ? (
        <EmptyMessage>No saved lists</EmptyMessage>
      ) : (
        lists.map((list) => (
          <ListContainer key={list._id}>
            {editingListId === list._id ? (
              <>
                <EditInput
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter new list name"
                />
                <div style={{ display: "flex", gap: "10px" }}>
                  <Button onClick={() => handleEdit(list._id)}>Save</Button>
                  <Button onClick={() => setEditingListId(null)}>Cancel</Button>
                </div>
              </>
            ) : (
              <>
                <ListTitle>{list.name}</ListTitle>
                <CreatedAt>
                  <strong>Created on:</strong>{" "}
                  <strong>{new Date(list.createdAt).toLocaleString()}</strong>
                </CreatedAt>

                <ImageGrid>
                  {list.codes.map((code) => (
                    <Card key={code} code={code} />
                  ))}
                </ImageGrid>

                <ActionButtons>
                  <Button
                    onClick={() => {
                      setEditingListId(list._id);
                      setNewName(list.name);
                    }}
                  >
                    Edit
                  </Button>
                  <Button delete onClick={() => handleDelete(list._id)}>
                    Delete
                  </Button>
                </ActionButtons>
              </>
            )}
          </ListContainer>
        ))
      )}
    </Container>
  );
};

export default Lists;
