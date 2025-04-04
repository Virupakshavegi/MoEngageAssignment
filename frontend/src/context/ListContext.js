import { createContext, useReducer } from "react";

export const ListContext = createContext();

export const listReducer = (state, action) => {
  switch (action.type) {
    case "SET_LISTS":
      return { lists: action.payload };
    case "CREATE_LIST":
      return { lists: [action.payload, ...state.lists] };
    case "UPDATE_LIST":
      return {
        lists: state.lists.map((list) =>
          list._id === action.payload._id ? action.payload : list
        ),
      };
    case "DELETE_LIST":
      return {
        lists: state.lists.filter((list) => list._id !== action.payload),
      };
    default:
      return state;
  }
};

export const ListContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listReducer, { lists: [] });

  return (
    <ListContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ListContext.Provider>
  );
};
