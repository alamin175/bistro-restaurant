import BistroBossText from "../BistroBossText/BistroBossText";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import ChefRecommends from "../ChefRecommends/ChefRecommends";
import Featured from "../Featured/Featured";
import Reviews from "../Reviews/Reviews";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Category></Category>
      <BistroBossText></BistroBossText>
      <MenuItem></MenuItem>
      <ChefRecommends></ChefRecommends>
      <Featured></Featured>
      <Reviews></Reviews>
    </div>
  );
};

export default Home;
