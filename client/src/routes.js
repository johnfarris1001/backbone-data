import App from "./App";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";

const routes = [
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/login",
                element: <Login />,
            },
        ],
    },
];

export default routes;
