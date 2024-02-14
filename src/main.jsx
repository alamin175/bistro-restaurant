import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import AuthContext from "./AuthContext/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import { router } from "./Routes/Routes";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContext>
      <QueryClientProvider client={queryClient}>
        <div className="bg-white max-w-screen-xl mx-auto">
          <RouterProvider router={router}></RouterProvider>
        </div>
      </QueryClientProvider>
    </AuthContext>
  </React.StrictMode>
);
