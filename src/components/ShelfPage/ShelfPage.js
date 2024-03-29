import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

function ShelfPage() {
  const dispatch = useDispatch();
  const shelf = useSelector((state) => state.shelf);
  console.log("shelf", shelf);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const addItem = () => {
    dispatch({ type: "ADD_ITEM", payload: { description, url } });
    setDescription('');
    setUrl('');
  };
  const deleteItem = (event) => {
    console.log("Delete has been clicked", event.target);
    console.log("Delete has been clicked", event.target.closest("div").id);
    const id = event.target.closest("div").id
    dispatch({type: "DELETE_ITEM", payload: {id}})
  }

  useEffect(() => {
    dispatch({
      type: "FETCH_SHELF",
    });
  }, [dispatch]);

  return (
    <div className="container">
      <h2>Shelf</h2>
      <form onSubmit={addItem}>
        <label htmlFor="description"></label>
        <input
          id="description"
          type="text"
          placeholder="Description"
          onChange={(event) => setDescription(event.target.value)}
          value={description}
        />
        <label htmlFor="url">
          <input
            id="url"
            type="text"
            placeholder="Image URL"
            onChange={(event) => setUrl(event.target.value)}
            value={url}
          />
        </label>
        <input type="submit" value="Add to Shelf"/>
      </form>

      <ul>
        {shelf?.map((shelves) => {
          return (
            <div id={shelves.id} key={shelves.id}>
          <li>{shelves.description}</li>
          <button onClick={event => deleteItem(event)}>Delete</button>
          </div>
          )
          
        })}
      </ul>
    </div>
  );
}

export default ShelfPage;
