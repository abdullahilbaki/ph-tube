import React, { Suspense, use } from "react";
import { RiseLoader } from "react-spinners";
import verifiedIcon from "../assets/verified.svg";

interface Authors {
  profile_picture: string;
  profile_name: string;
  verified: boolean;
}

interface Others {
  views: string;
  posted_date: string;
}

interface Videos {
  category_id: string;
  video_id: string;
  thumbnail: string;
  title: string;
  authors: Authors[];
  others: Others;
}

interface ApiResponse {
  category: Videos[];
  videos: Videos[];
}

const videosPromise: Promise<ApiResponse> = fetch(
  "https://openapi.programming-hero.com/api/phero-tube/videos"
).then((res) => res.json());

const Videos: React.FC = () => {
  return (
    <div className="container mx-auto px-4 sm:px-0 py-6">
      <Suspense
        fallback={
          <div className="flex justify-center mt-20">
            <RiseLoader />
          </div>
        }
      >
        <ShowVideos videosPromise={videosPromise} />
      </Suspense>
    </div>
  );
};

const ShowVideos: React.FC<{ videosPromise: Promise<ApiResponse> }> = ({
  videosPromise,
}) => {
  const apiResponse: ApiResponse = use(videosPromise);
  const videos: Videos[] = apiResponse.category ?? apiResponse.videos;
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-start">
      {videos.map((video) => (
        <div className="flex flex-col gap-3 h-full mb-8" key={video.video_id}>
          <img
            className="rounded-md w-full h-48 object-cover"
            src={video.thumbnail}
            alt={video.title}
          />
          <div className="flex gap-3 items-start">
            {video.authors.length > 0 && (
              <img
                className="w-10 h-10 object-cover rounded-full"
                src={video.authors[0].profile_picture}
                alt={video.authors[0].profile_name}
              />
            )}
            <div className="flex flex-col gap-1">
              <h2 className="font-semibold text-lg">{video.title}</h2>

              <div className="flex gap-2 items-center">
                {video.authors.length > 0 && (
                  <p className="text-gray-500">
                    {video.authors[0].profile_name}
                  </p>
                )}
                {video.authors[0].verified && (
                  <img src={verifiedIcon} alt="verified" />
                )}
              </div>
              {video.others.views !== "" && (
                <p className="text-gray-500"> {video.others.views}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Videos;
