// Videos.tsx

import React, { Suspense, use, useState, useEffect } from "react";
import { MoonLoader } from "react-spinners";
import verifiedIcon from "../assets/verified.svg";
import GetCategoryBtns from "./CategoryBtns";
import Icon from "../assets/Icon.png";
import Navbar from "./Navbar";

interface Author {
  profile_picture: string;
  profile_name: string;
  verified: boolean;
}

interface VideoOthers {
  views: string;
  posted_date: string;
}

interface Video {
  category_id: string;
  video_id: string;
  thumbnail: string;
  title: string;
  authors: Author[];
  others: VideoOthers;
}

interface ApiResponse {
  category: Video[];
  videos: Video[];
}

const Videos: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [videosPromise, setVideosPromise] = useState<Promise<ApiResponse>>(
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos").then(
      (res) => res.json()
    )
  );
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [sortByView, setSortByView] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      let url = "https://openapi.programming-hero.com/api/phero-tube/videos";
      if (categoryId) {
        url = `https://openapi.programming-hero.com/api/phero-tube/category/${categoryId}`;
      }
      if (searchQuery) {
        const queryParam = `?title=${searchQuery}`;
        url += categoryId ? `&${queryParam.slice(1)}` : queryParam;
      }
      const promise = fetch(url).then((res) => res.json());
      setVideosPromise(promise);
      setIsSearchActive(searchQuery !== "");
    };

    fetchVideos();
  }, [categoryId, searchQuery]);

  const handleCategoryChange = (newCategoryId: string | null) => {
    setCategoryId(newCategoryId);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSortByView = () => {
    setSortByView(!sortByView);
  };

  return (
    <div className="container mx-auto px-4 sm:px-0 py-6">
      <Navbar onSearch={handleSearch} onSortByView={handleSortByView} />
      <GetCategoryBtns
        onCategoryChange={handleCategoryChange}
        isSearchActive={isSearchActive}
      />
      <Suspense
        fallback={
          <div className="mt-20 flex justify-center">
            <MoonLoader />
          </div>
        }
      >
        <VideoDisplay
          videosPromise={videosPromise}
          searchQuery={searchQuery}
          sortByView={sortByView}
        />
      </Suspense>
    </div>
  );
};

const VideoDisplay: React.FC<{
  videosPromise: Promise<ApiResponse>;
  searchQuery: string;
  sortByView: boolean;
}> = ({ videosPromise, searchQuery, sortByView }) => {
  const apiResponse: ApiResponse = use(videosPromise);
  let videos: Video[] = apiResponse.category ?? apiResponse.videos;

  if (searchQuery) {
    videos = videos.filter((video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortByView) {
    videos.sort((a, b) => {
      const viewsA = parseInt(a.others.views.replace("K", "000"));
      const viewsB = parseInt(b.others.views.replace("K", "000"));
      return viewsB - viewsA;
    });
  }

  return videos.length > 0 ? (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-start">
      {videos.map((video) => (
        <div className="flex flex-col gap-3 mb-8" key={video.video_id}>
          <img
            className="w-full h-48 object-cover rounded-md"
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
              <h2 className="text-lg font-semibold">{video.title}</h2>
              <div className="flex gap-2 items-center">
                {video.authors.length > 0 && (
                  <p className="text-gray-500">
                    {video.authors[0].profile_name}
                  </p>
                )}
                {video.authors[0].verified && (
                  <img src={verifiedIcon} alt="Verified" />
                )}
              </div>
              {video.others.views && (
                <p className="text-gray-500">{video.others.views}</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div className="mt-20 flex flex-col items-center justify-center gap-8">
      <img src={Icon} alt="No videos found" />
      <h2 className="text-2xl sm:text-3xl font-bold text-center max-w-80">
        Oops!! Sorry, There is no content here
      </h2>
    </div>
  );
};

export default Videos;
