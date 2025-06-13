import { useSelector } from "react-redux";

export const SectionFeaturedCategories = () => {
  const data = useSelector((state) => state.categorySlice.cate);
  return (
    <section className="py-6  bg-gray-100">
      {data &&
        data.slice(0, 3).map(({ images, name, description, id }, index) => (
          <div key={id} className="container mb-6">
            <div className="lg:flex items-center justify-between gap-5">
              {index % 2 === 0 ? (
                <>
                  <div className="lg:w-1/2">
                    <p className="text-[14px] uppercase">{name}</p>
                    <h2 className="text-3xl font-semibold py-4 lg:py-6 leading-[1.4] whitespace-pre-line">
                      {description}
                    </h2>
                    <a
                      href="#none"
                      className="h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Khám phá
                    </a>
                  </div>
                  <div className="lg:w-1/2 rounded-2xl overflow-hidden mt-6 lg:mt-0 flex justify-center">
                    <img
                      className="w-full object-cover inline-block"
                      src={images}
                      alt=""
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="lg:w-1/2 rounded-2xl overflow-hidden mt-6 lg:mt-0 flex justify-center">
                    <img
                      className="w-full object-cover inline-block"
                      src={images}
                      alt=""
                    />
                  </div>
                  <div className="lg:w-1/2 pt-4">
                    <p className="text-[14px] uppercase">{name}</p>
                    <h2 className="text-3xl font-semibold py-5 lg:py-5 leading-[1.4] whitespace-pre-line">
                      {description}
                    </h2>
                    <a
                      href="#none"
                      className="h-9 border border-black px-7 inline-flex items-center font-semibold text-black rounded-full text-[15px] hover:bg-black hover:text-white transition-all duration-300"
                    >
                      Khám phá
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
    </section>
  );
};
