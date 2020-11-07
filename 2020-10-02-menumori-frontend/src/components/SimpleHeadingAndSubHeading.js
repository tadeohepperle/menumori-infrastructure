export default function SimpleHeadingAndSubHeading({
  title,
  subtitle,
  loading,
}) {
  return (
    <div
      className={`flex flex-wrap w-full flex-col px-6${
        loading ? "animate-pulse" : ""
      }`}
    >
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2">
        {title}
      </h1>
      <p className="lg:w-2/3 w-full leading-relaxed text-base">{subtitle}</p>
    </div>
  );
}
