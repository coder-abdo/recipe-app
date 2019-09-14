import React, { useState, useEffect } from "react";
import { recipeItem } from "../tempDetails";
import styles from "../styles/recipeItem.module.css";
export default function RecipeDetails(props: {
  id: number;
  goToHome: (pageIndex: number) => void;
}): JSX.Element {
  const [recipe, setRecipe] = useState(recipeItem);
  const {
    image_url: img,
    publisher,
    publisher_url,
    source_url: URL,
    title,
    ingredients
  } = recipe;
  const { goToHome, id } = props;
  const [url, setUrl] = useState(
    `https://www.food2fork.com/api/get?key=a52feb90faff313d055bd49c617cb3ca&rId=${id}`
  );
  const getRecipedetails = async () => {
    try {
      const data = await fetch(url);
      const dataJSON = await data.json();
      setRecipe(dataJSON.recipe);
    } catch (err) {
      throw "err" + err;
    }
  };
  useEffect(() => {
    getRecipedetails();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.recipeImage}>
        <button type="button" onClick={() => goToHome(1)}>
          back to recipe list
        </button>
        <img src={img} alt={title} />
      </div>
      <div className={styles.recipeDetails}>
        <h2>{title}</h2>
        <h3>provided by: {publisher}</h3>
        <div className={styles.actions}>
          <a
            target="_blank"
            className={styles.publisher}
            href={publisher_url}
            rel="noopener noreferrer"
          >
            publisher webpage
          </a>
          <a
            rel="noopener noreferrer"
            target="_blank"
            className={styles.url}
            href={URL}
          >
            recipe url
          </a>
        </div>
        <div className={styles.ingredientsContainer}>
          <h2>Ingredients:</h2>
          <ul className={styles.ingredients}>
            {ingredients.map(
              (ingredient: string, idx: number): JSX.Element => (
                <li key={idx}>{ingredient}</li>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
