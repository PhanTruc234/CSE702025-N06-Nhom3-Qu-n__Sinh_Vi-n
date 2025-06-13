import { useDispatch, useSelector } from "react-redux";
import { ViewProduct } from "./ViewProduct";
import { ViewCategory } from "./ViewCategory";
import { ViewService } from "./ViewService";
import { ViewBanner } from "./ViewBanner";
import { SectionFeaturedCategories } from "./SectionFeaturedCategories";
export const Home = () => {
  return (
    <main>
      <ViewBanner />
      <ViewService />
      <ViewCategory />
      <ViewProduct />
      <SectionFeaturedCategories />
    </main>
  );
};
