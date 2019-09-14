import React from "react";
import styles from "../styles/recipe.module.css";
export default function Recipe(props: {
  image_url: string;
  title: string;
  publisher: string;
  source_url: string;
  recipe_id: number;
  handlePgaeDetails: (idx:number, id:number) => void | undefined;
}): JSX.Element {
  const {
    image_url: img,
    title,
    publisher,
    source_url: url,
    recipe_id: id,
    handlePgaeDetails,
  } = props;
  return (
      <div className={styles.recipe}>
        <div
          className={styles.img}
          style={{ backgroundImage: `url(${img})` }}
        />
        <div className={styles.headings}>
          <h2 className={styles.title}>{title}</h2>
          <h4 className={styles.maker}>provided by: {publisher}</h4>
        </div>
        <div className={styles.actions}>
          <button
            className={styles.button}
            type="button"
            onClick={() => handlePgaeDetails(0, id)}
          >
            details
          </button>
          <a href={url} className={styles.link}>
            recipe url
          </a>
        </div>
      </div>
  );
}
