import { useAuthContext } from "./useAuthContext";
import { useListsContext } from "./useListContext";
export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: workoutsDispatch } = useListsContext();
  const logout = () => {
    //remove user from storage
    localStorage.removeItem("user");
    //dispatch logout action
    dispatch({ type: "LOGOUT" });
    workoutsDispatch({ type: "SET_WORKOUTS", payload: null });
  };
  return { logout };
};
