import React, { Fragment, FormEvent, ChangeEvent } from "react";
import styles from "../styles/search.module.css";
type Formy = {
  value: string;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
export default function RecipeSearch(props: Formy): JSX.Element {
  const { value, handleChange, handleSubmit } = props;
  return (
    <Fragment>
      <h2 className={styles.title}>
        search for Recipe with <span>food2fork</span>
      </h2>
      <h4 className={styles.subTitle}>type recipes seperated by comma</h4>
      <form onSubmit={handleSubmit}>
        <div className={styles.search}>
          <input
            type="text"
            placeholder="Chickens,Onions,..etc"
            name="search"
            value={value}
            onChange={handleChange}
          />
          <button type="submit">&#x02315;</button>
        </div>
      </form>
    </Fragment>
  );
}
