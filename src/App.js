import './App.css';
import AddRecipe from "./pages/recipe/AddRecipe";
import Schedule from "./pages/schedule/Schedule";
import RecipeList from "./pages/recipe/RecipeList";
import {Container} from "react-bootstrap";
import {Outlet} from "react-router-dom";

function App() {
  return (
    <Container>
        <Outlet />
    </Container>
  );
}

export default App;
