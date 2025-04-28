import React, { useEffect } from "react";
import { useState, SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import "../../../css/order.css";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import { useHistory } from "react-router-dom";
import { serverApi } from "../../../lib/config";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
}); //Action Dispatcher

export default function OrdersPage() {
  const { setPausedOrders, setProcessOrders, setFinishedOrders } =
    actionDispatch(useDispatch());
  const { orderBuilder, authMember } = useGlobals();
  const history = useHistory();
  const [value, setValue] = useState("1");
  const [orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PAUSE })
      .then((data) => {
        setPausedOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.PROCESS })
      .then((data) => {
        setProcessOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });

    order
      .getMyOrders({ ...orderInquiry, orderStatus: OrderStatus.FINISH })
      .then((data) => {
        setFinishedOrders(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [orderInquiry, orderBuilder]);

  /** HANDLERS**/

  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  if (!authMember) history.push("/"); //redirect to home page
  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Stack className="order-left">
          <TabContext value={value}>
            <Box className="order-nav-frame">
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  className={"table_list"}
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESSED ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
            </Box>
            <Stack className={"order-main-content"}>
              <PausedOrders setValue={setValue} />
              <ProcessOrders setValue={setValue} />
              <FinishedOrders />
            </Stack>
          </TabContext>
        </Stack>

        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className="member-box">
              <div className="order-user-img">
                <img
                  src={
                    authMember?.memberImage
                      ? `${serverApi}/${authMember.memberImage}`
                      : "/icons/default-user.svg"
                  }
                  className={"order-user-avatar"}
                />
                <div className={"order-user-icon-box"}>
                  <img
                    src={
                      authMember?.memberType === "RESTAURANT"
                        ? "/icons/restaurant.svg"
                        : "/icons/user-badge.svg"
                    }
                    className={"order-user-prof-img"}
                  />
                </div>
              </div>
              <div className="order-user-desc">
                <p className="order-user-name">{authMember?.memberNick}</p>
                <p className="order-user-prof">{authMember?.memberType}</p>
              </div>
              <div className="liner"></div>
              <div className="order-user-address">
                <img
                  src="/icons/location.svg"
                  className="order-user-location-icon"
                />
                <p className="spec-address-txt">
                  {authMember?.memberAddress
                    ? authMember.memberAddress
                    : "Do not exist"}
                </p>
              </div>
            </Box>
          </Box>
          <Box className={"order-info-box"}>
            <Box className="payment-card-box">
              <input
                type="text"
                className="card-input"
                placeholder="Card number : 5243 4090 2002 7495"
              />
              <div className="card-input-time">
                <input
                  type="text"
                  placeholder="07 / 24"
                  className="card-input-time-box"
                  style={{ marginRight: "10px" }}
                />
                <input
                  type="text"
                  placeholder="CVV : 010"
                  className="card-input-time-box"
                />
              </div>
              <input
                type="text"
                placeholder="Justin Robertson"
                className="card-input"
              />

              <div className="payment-methods">
                <img src="/icons/western-card.svg" alt="" />
                <img src="/icons/master-card.svg" alt="" />
                <img src="/icons/paypal-card.svg" alt="" />
                <img src="/icons/visa-card.svg" alt="" />
              </div>
            </Box>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
