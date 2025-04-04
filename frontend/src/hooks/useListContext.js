import { ListContext } from "../context/ListContext";
import { useContext } from "react";

export const useListsContext = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw Error("useListsContext must be used inside a ListContextProvider");
  }
  return context;
};
