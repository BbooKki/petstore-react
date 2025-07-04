import Statistics from "./Statistics";
import PopularPets from "./PopularPets";
import NewPets from "./NewPets";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewPets, setPopularPets, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularPets: (data: Product[]) => dispatch(setPopularPets(data)),
  setNewPets: (data: Product[]) => dispatch(setNewPets(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
}); //Action Dispatcher

export default function HomePage() {
  const { setPopularPets, setNewPets, setTopUsers } = actionDispatch(
    useDispatch()
  );

  console.log(process.env.REACT_APP_API_URL);

  useEffect(() => {
    //Backend server data fetch => Data
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        // productCollection: ProductCollection.BLACK,
      })
      .then((data) => {
        setPopularPets(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 8,
        order: "createdAt",
      })
      .then((data) => {
        setNewPets(data);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => {
        setTopUsers(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <NewPets />
      <Advertisement />
      <PopularPets />
      <Events />
      <ActiveUsers />
    </div>
  );
}
