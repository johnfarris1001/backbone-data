import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Menu, Button } from "semantic-ui-react";
import { UserContext } from "../contexts/UserContext";

function NavBar({ handleClick }) {
    const { user, authorizing } = useContext(UserContext);

    return (
        <Menu className="navbar" style={{ backgroundColor: "#f9f9f9" }}>
            <Menu.Item>
                <NavLink to="/">Home</NavLink>
            </Menu.Item>
            <Menu.Item>
                <NavLink to="/ratings">Ratings</NavLink>
            </Menu.Item>
            <Menu.Menu position="right">
                <Menu.Item>
                    <Button onClick={handleClick}>
                        {user ? `Logout: ${user.username}` : "Login"}
                    </Button>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    );
}

export default NavBar;
