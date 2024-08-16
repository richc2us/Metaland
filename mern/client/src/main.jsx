import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Record from "./components/Record";
import Buyer from "./components/Buyer";
import Agent from "./components/Agent";
import ProjectIndex from "./components/Projects/ProjectIndex";
import ProjectAddEdit from "./components/Projects/ProjectAddEdit";
import Lot from "./components/Lot";
import RecordList from "./components/RecordList";
import BuyerList from "./components/BuyerList";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <RecordList />,
      },
    ],
  },
  {
    path: "/BuyerList",
    element: <App />,
    children: [
      {
        path: "/BuyerList",
        element: <BuyerList />,
      },
    ],
  },
  {
    path: "/create",
    element: <App />,
    children: [
      {
        path: "/create",
        element: <Record />,
      },
    ],
  },
  {
    path: "/createBuyer",
    element: <App />,
    children: [
      {
        path: "/createBuyer",
        element: <Buyer />,
      },
    ],
  },  
  {
    path: "/createAgent",
    element: <App />,
    children: [
      {
        path: "/createAgent",
        element: <Agent />,
      },
    ],
  },  
  {
    path: "/projects",
    element: <App />,
    children: [
      {
        path: "",
        element: <ProjectIndex />,
      },
      {
        path: "add",
        element: <ProjectAddEdit />,
      },
      {
        path: "edit/:id",
        element: <ProjectAddEdit />,
      },
    ],
  },  
  {
    path: "/createLot",
    element: <App />,
    children: [
      {
        path: "/createLot",
        element: <Lot />,
      },
    ],
  },  
  {
    path: "/edit/:id",
    element: <App />,
    children: [
      {
        path: "/edit/:id",
        element: <Record />,
      },
    ],
  },
  {
    path: "/BuyerEdit/:id",
    element: <App />,
    children: [
      {
        path: "/BuyerEdit/:id",
        element: <Buyer />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
