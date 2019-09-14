import React, { useState, useEffect, FormEvent } from "react";
import styles from "./styles/App.module.css";
import { recipesList } from "./tempList";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";
const App: React.FC = (): JSX.Element => {
  const [recipes, setRecipes] = useState(recipesList);
  const [value, setValue] = useState('meat');
  const [err, setErr] = useState('');
  const [url, setUrl] = useState(
    `https://www.food2fork.com/api/search?key=a52feb90faff313d055bd49c617cb3ca&q=${value}`
  );
  const [id, setId] = useState(35122);
  const [pageIndex, setPageIndex] = useState(1);
  const getRecipes: () => Promise<void> = async () => {
    try {
      const data = await fetch(url);
      const JSONData = await data.json();
      const { recipes } = JSONData;
      if(!recipes || recipes.length === 0){
        setErr("Sorry You Input Is Incorrect!!");
      }else{
        setRecipes(recipes);

      }
    } catch (err) {
      throw "err" + err;
    }
  };
  useEffect(() => {
    getRecipes();
  }, [url]);
  const handleIndex = (idx: number): void => {
    setPageIndex(idx);
  };
  const handlePgaeDetails = (idx: number, id: number): void | undefined => {
    setId(id);
    setPageIndex(idx);
  };
  const handleChange:(event:FormEvent<HTMLInputElement>)=>void = (e) => {
    setValue(e.currentTarget.value);
    //console.log(value);
  };
  const handleSubmit:(event:FormEvent<HTMLFormElement>) => void = (e) => {
    e.preventDefault();
    setUrl(`https://www.food2fork.com/api/search?key=a52feb90faff313d055bd49c617cb3ca&q=${value}`);
    getRecipes();
    //console.log(url);
  }
  const switchPages = (pageIndex: number): JSX.Element | undefined => {
    switch (pageIndex) {
      case 1:
        return (
          <RecipeList recipes={recipes} handlePgaeDetails={handlePgaeDetails} handleChange={handleChange} handleSubmit={handleSubmit} value={value} err={err}/>
        );
      case 0:
        return <RecipeDetails id={id} goToHome={handleIndex} />;
      default:
        return (
          <RecipeList recipes={recipes} handlePgaeDetails={handlePgaeDetails} handleChange={handleChange} handleSubmit={handleSubmit} value={value} err={err}/>
        );
    }
  };

  return <div className={styles.App}>{switchPages(pageIndex)}</div>;
};

export default App;
