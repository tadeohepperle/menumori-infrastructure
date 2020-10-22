export default function SimpleHeadingAndSubHeading({
  title,
  subtitle,
  loading,
}) {
  return (
    <div
      class={`flex flex-wrap w-full flex-col px-6 mt-8${
        loading ? "animate-pulse" : ""
      }`}
    >
      <h1 class="sm:text-3xl text-2xl font-medium title-font mb-2">{title}</h1>
      <p class="lg:w-2/3 w-full leading-relaxed text-base">{subtitle}</p>
    </div>
  );
}
