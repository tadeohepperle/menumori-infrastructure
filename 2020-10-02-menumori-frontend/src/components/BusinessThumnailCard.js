import Link from "next/link";
import { IAPIURL } from "../../config";
import { cutEndOfString } from "../services/utility";

export default function BusinessThumnailCard({ business }) {
  let { title, description, cover_image, slugname } = business;

  let imageUrl = `${IAPIURL}${cover_image}`;

  console.log(imageUrl);

  return (
    <>
      <div className="rounded-lg h-64 overflow-hidden">
        <img
          alt="content"
          className="object-cover object-center h-full w-full"
          src={imageUrl}
        ></img>
      </div>
      <Link href={`/b/${slugname}`}>
        <a>
          <h2 className="text-xl font-medium title-font mt-5 text-teal-500">
            {title}
          </h2>
        </a>
      </Link>
      <p className="text-base leading-relaxed mt-2">
        {cutEndOfString(description, 150)}
      </p>
      <a href={`/b/${slugname}`}>
        <button className="btn inline-flex items-center mt-4 shadow">
          mehr erfahren
          <svg
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-4 h-4 ml-2"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </button>
      </a>
    </>
  );
}
