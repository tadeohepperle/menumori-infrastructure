const HeadingBig = ({ title, subtitle }) => {
  return (
    <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
      <h2 className=" uppercase text-bold text-teal-500">{subtitle}</h2>
      <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">
        {title}
      </h1>
    </div>
  );
};

export default HeadingBig;
