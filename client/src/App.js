import NavBar from "./components/NavBar";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

function App() {
    const { user, setUser, setAuthorizing } = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {
        setAuthorizing(true);
        fetch("/me").then((resp) => {
            if (resp.ok) {
                resp.json().then((user) => {
                    setUser(user);
                    setAuthorizing(false);
                });
            } else {
                setAuthorizing(false);
            }
        });
    }, [setUser]);

    function onLogin(user) {
        setUser(user);
        navigate("/profile");
    }

    return (
        <div className="App">
            <br />
            <NavBar />
            <br />
            <Outlet
                context={{
                    onLogin: onLogin,
                    user: user,
                    setUser: setUser,
                }}
            />
        </div>
    );
}

export default App;
