import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GameRoom from "./routes/GameRoom.tsx";
import OfflineMode from "./routes/OfflineMode.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/game-room",
        element: <GameRoom />,
    },
    {
        path: '/offline-mode',
        element : <OfflineMode/>
    }
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
