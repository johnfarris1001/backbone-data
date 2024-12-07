import NavBar from "./components/NavBar";
import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NewRatingForm from "./forms/NewRatingForm";
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
        navigate("/");
    }

    function handleClick() {
        if (user) {
            fetch("/logout", {
                method: "DELETE",
            }).then(() => setUser(null));
            navigate("/");
        } else {
            navigate("/login");
        }
    }

    return (
        <div className="App" style={{ backgroundColor: "#f9f1f1" }}>
            <br />
            <NavBar handleClick={handleClick} />
            <br />
            <Outlet
                context={{
                    onLogin: onLogin,
                    user: user,
                    setUser: setUser,
                }}
            />
            <NewRatingForm />
        </div>
    );
}

export default App;
