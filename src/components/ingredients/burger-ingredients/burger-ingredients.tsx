import { Tab } from "@ya.praktikum/react-developer-burger-ui-components/dist/ui/tab";
import { FC, useEffect, useRef, useState } from "react";
import BurgerIngredientItems from "../burger-ingredient-items/burger-ingredient-items";
import styles from "./burger-ingredients.module.css";

const BurgerIngredients: FC = () => {
  const [active, setActive] = useState("buns");
  const [current, setCurrent] = useState("buns");

  const bunHeaderRef = useRef<HTMLHeadingElement>(null);
  const sauceHeaderRef = useRef<HTMLHeadingElement>(null);
  const mainHeaderRef = useRef<HTMLHeadingElement>(null);
  const ingredientsRef = useRef<HTMLDivElement>(null);

  const setCurrentHandler = (name: string) => {
    setCurrent(name);
  };

  const setTabActiveHandler = () => {
    if (bunHeaderRef && bunHeaderRef.current && sauceHeaderRef.current && ingredientsRef.current) {
      const elemOnePos: DOMRect = bunHeaderRef.current.getBoundingClientRect();
      const elemTwoPos = sauceHeaderRef.current.getBoundingClientRect();
      const containerPos = ingredientsRef.current.getBoundingClientRect();
      const containerOffset = containerPos.top;
      const OFFSET_CUSTOM = 70;
      if (
        elemOnePos.top <= containerOffset + bunHeaderRef.current.scrollHeight &&
        elemOnePos.top > containerOffset - bunHeaderRef.current.nextElementSibling!.scrollHeight
      ) {
        setActive("buns");
      } else if (
        elemTwoPos.top < containerOffset + sauceHeaderRef.current.scrollHeight &&
        elemTwoPos.top >
          containerOffset - sauceHeaderRef.current.nextElementSibling!.scrollHeight + OFFSET_CUSTOM
      ) {
        setActive("sauces");
      } else {
        setActive("mains");
      }
    }
  };

  const clickScrollHandler = () => {
    if (
      bunHeaderRef.current &&
      sauceHeaderRef.current &&
      mainHeaderRef.current &&
      ingredientsRef.current
    ) {
      const element =
        current === "buns"
          ? bunHeaderRef.current
          : current === "sauces"
          ? sauceHeaderRef.current
          : mainHeaderRef.current;
      ingredientsRef.current!.scrollTo({
        top: element.offsetTop - ingredientsRef.current.offsetTop,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    clickScrollHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Соберите бургер</h1>
      <div className={styles.tabs}>
        <Tab
          value="one"
          active={active === "buns"}
          onClick={() => (current === "buns" ? clickScrollHandler() : setCurrentHandler("buns"))}
        >
          Булки
        </Tab>
        <Tab
          value="two"
          active={active === "sauces"}
          onClick={() =>
            current === "sauces" ? clickScrollHandler() : setCurrentHandler("sauces")
          }
        >
          Соусы
        </Tab>
        <Tab
          value="three"
          active={active === "mains"}
          onClick={() => (current === "mains" ? clickScrollHandler() : setCurrentHandler("mains"))}
        >
          Начинки
        </Tab>
      </div>
      <div ref={ingredientsRef} onScroll={setTabActiveHandler} className={styles.categories}>
        <BurgerIngredientItems
          bunHeaderRef={bunHeaderRef}
          sauceHeaderRef={sauceHeaderRef}
          mainHeaderRef={mainHeaderRef}
        />
      </div>
    </div>
  );
};

export default BurgerIngredients;
