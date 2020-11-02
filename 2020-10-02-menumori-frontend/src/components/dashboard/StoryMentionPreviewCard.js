import moment from "moment";
import { IAPIURL } from "../../../config";
import { SVG_Instagram } from "../small/SVG";

const StoryMentionPreviewCard = ({ storyMention }) => {
  //console.log(storyMention);

  if (!storyMention) {
    return (
      <div className="storymention-preview-card relative">
        <div className="storymention-preview-card-image bg-gray-300 animate-pulse"></div>

        {false && (
          <div className="absolute top-0 text-center text-teal-500 font-bold bg-white shadow border-2 rounded-lg p-1 px-16">
            ...
          </div>
        )}
      </div>
    );
  }

  let germanDateString = moment(storyMention?.date).format("DD.MM.YYYY, hh:mm");

  return (
    <div className="storymention-preview-card relative">
      <img
        className="storymention-preview-card-image"
        src={`${IAPIURL}${storyMention?.media_url}`}
      ></img>
      <div className="absolute top-0 text-center text-teal-500 font-bold bg-white shadow border-2 rounded-tl-lg rounded-br-lg  rounded-tr-lg p-1">
        {germanDateString}
      </div>

      <div className="w-12 h-12 absolute bottom-0 right-0 text-center text-teal-500 rounded-lg pb-4 pr-4 ">
        <a
          target="_blank"
          href={`https://www.instagram.com/${storyMention.username}/`}
        >
          <SVG_Instagram></SVG_Instagram>
        </a>
      </div>
    </div>
  );
};

export default StoryMentionPreviewCard;
