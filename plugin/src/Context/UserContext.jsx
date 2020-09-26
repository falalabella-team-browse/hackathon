import { createContext, useContext } from "react";

const UserContext = createContext({
  userId: "",
  productId: "",
});

const useUser = () => useContext(UserContext);

export default UserContext;
export { useUser };
