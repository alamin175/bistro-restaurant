import { Helmet } from "react-helmet";
import useMenu from "../../../hooks/useMenu";
import MenuCategory from "../MenuCategory/MenuCategory";
import img1 from "../../../asset/menu/banner3.jpg";
import dessert from "../../../asset/menu/dessert-bg.jpeg";
import pizza from "../../../asset/menu/pizza-bg.jpg";
import salad from "../../../asset/menu/salad-bg.jpg";
import soup from "../../../asset/menu/soup-bg.jpg";

const Menu = () => {
  const [menu] = useMenu();
  const offered = menu.filter((item) => item.category === "offered");
  const desserts = menu.filter((item) => item.category === "dessert");
  const pizzas = menu.filter((item) => item.category === "pizza");
  const salads = menu.filter((item) => item.category === "salad");
  const soups = menu.filter((item) => item.category === "soup");

  return (
    <div>
      <Helmet>
        <title>Menu- Bistro</title>
      </Helmet>

      <MenuCategory
        items={offered}
        title="Today's offer"
        subTitle="Don't Miss"
        img={img1}
      ></MenuCategory>
      <MenuCategory
        title="Delicious Dessert"
        subTitle="Pick First "
        items={desserts}
        img={dessert}
      ></MenuCategory>
      <MenuCategory
        title="italiano's pizza"
        subTitle="Only for pizza lover"
        items={pizzas}
        img={pizza}
      ></MenuCategory>
      <MenuCategory
        title="Healthy Salad"
        subTitle="Tasty & Healthy "
        items={salads}
        img={salad}
      ></MenuCategory>
      <MenuCategory
        title="Special Soup"
        subTitle="Yummy Soup"
        items={soups}
        img={soup}
      ></MenuCategory>
    </div>
  );
};

export default Menu;
