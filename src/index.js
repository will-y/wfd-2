import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Schedule from "./pages/schedule/Schedule";
import AddRecipe from "./pages/recipe/AddRecipe";
import RecipeList from "./pages/recipe/RecipeList";
import IngredientList from "./pages/ingredients/IngredientList";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<App />}>
              <Route path="/" element={<Schedule />}/>
              <Route path="add" element={<AddRecipe />}/>
              <Route path="recipes" element={<RecipeList location="list" edit={true} editRecipe={true}/>}/>
              <Route path="ingredient-list" element={<IngredientList />}/>
          </Route>
      </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
