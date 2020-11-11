const HeadingSectionSmaller = ({ title, subtitle }) => {
  return (
    <section className="section-emphasis">
      <div className="container mx-auto flex py-12 md:flex-row flex-col">
        <div className=" lg:flex-grow  flex flex-col mb-16 md:mb-0">
          <h2 className="uppercase text-bold text-teal-500 text-center text-lg">
            {subtitle}
          </h2>
          <h1 className="title-font sm:text-4xl text-4xl mb-4 font-medium text-gray-900 text-center">
            {title}
            <br className="hidden lg:inline-block" />
          </h1>
        </div>
      </div>
    </section>
  );
};

export default HeadingSectionSmaller;
