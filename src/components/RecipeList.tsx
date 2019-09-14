import React, { Fragment, ChangeEvent, FormEvent } from "react";
import Recipe from "./Recipe";
import RecipeSearch from "./RecipeSearch";
import styles from "../styles/recipes-list.module.css";
type recipesType = {
  recipe_id: number;
  image_url: string;
  title: string;
  publisher: string;
  source_url: string;
};
export default function RecipeList(props: {
  recipes: [recipesType, recipesType, recipesType];
  handlePgaeDetails: (idx:number, id:number) => void | undefined;
  value:string;
  handleChange:(event: FormEvent<HTMLInputElement>) => void;
  handleSubmit:(event:FormEvent<HTMLFormElement>) => void;
  err:string;
}): JSX.Element {
  const { recipes, handlePgaeDetails, value, handleChange, handleSubmit,err } = props;
  return (
    <Fragment>
      <RecipeSearch value={value} handleChange={handleChange} handleSubmit={handleSubmit}/>
      <h1 className={styles.mainTitle}>Recipes list</h1>
      {recipes && recipes.length > 0 ? (<div className={styles.container}>
        { recipes.map(
          (recipe: {
            image_url: string;
            title: string;
            publisher: string;
            source_url: string;
            recipe_id: number;
          }): JSX.Element => {
            const {
              image_url: img,
              title,
              publisher,
              source_url: url,
              recipe_id
            } = recipe;
            return (
              <Recipe
                key={recipe_id}
                recipe_id={recipe_id}
                image_url={img}
                title={title}
                source_url={url}
                publisher={publisher}
                handlePgaeDetails={handlePgaeDetails}
              />
            );
          }
        )}
      </div>):<h2 className={styles.err}>{err}</h2>} 
    </Fragment>
  );
}
