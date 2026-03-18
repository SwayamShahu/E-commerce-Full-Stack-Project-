import mainBanner from "../../assets/banners/mainBanner.jpeg";

const Carousel = () => {
  return (
    <section className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="relative w-full overflow-hidden rounded-xl">
          <img
            src={mainBanner}
            alt="Main Banner"
            className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Carousel;
