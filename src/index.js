import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Schedule from "./components/pages/schedule/Schedule";
import AddRecipe from "./components/pages/recipe/AddRecipe";
import RecipeList from "./components/pages/recipe/RecipeList";
import IngredientList from "./components/pages/ingredients/IngredientList";
import {RequireAuth} from "./components/wrappers/RequireAuth";
import {NoAccess} from "./components/pages/other/NoAccess";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />}>
              <Route path="/" element={<RequireAuth path="/"><Schedule /></RequireAuth>}/>
              <Route path="add" element={<RequireAuth path="add"><AddRecipe /></RequireAuth>}/>
              <Route path="recipes" element={<RequireAuth path="recipes"><RecipeList location="list" edit={true} editRecipe={true}/></RequireAuth>}/>
              <Route path="ingredient-list" element={<RequireAuth path="ingredient-list"><IngredientList /></RequireAuth>}/>
              <Route path="no-access" element={<NoAccess />}/>
          </Route>
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
