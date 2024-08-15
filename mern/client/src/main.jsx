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
import Project from "./components/Project";
import Lot from "./components/Lot";
import RecordList from "./components/RecordList";
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
    path: "/createProject",
    element: <App />,
    children: [
      {
        path: "/createProject",
        element: <Project />,
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
