import { useSelector } from "react-redux";
import { State } from "../types";

// eslint-disable-next-line import/prefer-default-export
export const useGetWhalePool = () => {
  return useSelector((state: State) => state.whalePool)
}