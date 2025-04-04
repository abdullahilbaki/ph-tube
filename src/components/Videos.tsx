import React, { Suspense, useState, useEffect } from "react";
import { MoonLoader } from "react-spinners";
import verifiedIcon from "../assets/verified.svg";
import GetCategoryBtns from "./CategoryBtns";
import Icon from "../assets/Icon.png";
import Navbar from "./Navbar";
import VideoDetails from "./VideoDetails";
import NiceModal from "@ebay/nice-modal-react";

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
  category?: Video[];
  videos: Video[];
}

const Videos: React.FC = () => {
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [videos, setVideos] = useState<Video[]>([]);
  const [sortByView, setSortByView] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      let url = "https://openapi.programming-hero.com/api/phero-tube/videos";
      if (categoryId) {
        url = `https://openapi.programming-hero.com/api/phero-tube/category/${categoryId}`;
      }
      if (searchQuery) {
        const queryParam = `?title=${searchQuery}`;
        url += queryParam;
      }
      try {
        const response = await fetch(url);
        const data: ApiResponse = await response.json();
        setVideos(data.category ?? data.videos);
      } catch (error) {
        console.error("Failed to fetch videos:", error);
      } finally {
        setLoading(false);
      }
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
    setSortByView((prev) => !prev);
  };

  const handleVideoClick = (id: string) => {
    setSelectedVideo(id);
    NiceModal.show(VideoDetails, { id: id });
  };

  return (
    <div className="container mx-auto px-4 sm:px-0 py-6">
      <Navbar onSearch={handleSearch} onSortByView={handleSortByView} />
      <GetCategoryBtns onCategoryChange={handleCategoryChange} />

      <Suspense
        fallback={
          <div className="mt-20 flex justify-center">
            <MoonLoader />
          </div>
        }
      >
        <VideoDisplay
          videos={videos}
          searchQuery={searchQuery}
          sortByView={sortByView}
          onVideoClick={handleVideoClick}
          loading={loading}
        />

        {selectedVideo && <VideoDetails id={selectedVideo} />}
      </Suspense>
    </div>
  );
};

const VideoDisplay: React.FC<{
  videos: Video[];
  searchQuery: string;
  sortByView: boolean;
  onVideoClick: (id: string) => void;
  loading: boolean;
}> = ({ videos, searchQuery, sortByView, onVideoClick, loading }) => {
  if (loading) {
    return (
      <div className="mt-20 flex justify-center">
        <MoonLoader />
      </div>
    );
  }

  let filteredVideos = videos;

  if (searchQuery) {
    filteredVideos = filteredVideos.filter((video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  if (sortByView) {
    filteredVideos.sort((a, b) => {
      const parseViews = (views: string): number => {
        if (views.includes("K")) {
          return parseFloat(views.replace("K", "")) * 1_000;
        } else if (views.includes("M")) {
          return parseFloat(views.replace("M", "")) * 1_000_000;
        }
        return parseInt(views) || 0;
      };
      return parseViews(b.others.views) - parseViews(a.others.views);
    });
  }

  return filteredVideos.length > 0 ? (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center items-start">
      {filteredVideos.map((video) => (
        <div
          className="flex flex-col gap-4 mb-8 cursor-pointer bg-white hover:shadow-md active:shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 active:scale-95 sm:active:scale-100"
          key={video.video_id}
          onClick={() => onVideoClick(video.video_id)}
        >
          <img
            className="w-full h-52 object-cover"
            src={video.thumbnail}
            alt={video.title}
          />

          <div className="p-4 flex gap-4">
            {video.authors.length > 0 && (
              <img
                className="w-12 h-12 object-cover rounded-full border border-gray-200"
                src={video.authors[0].profile_picture}
                alt={video.authors[0].profile_name}
              />
            )}

            <div className="flex flex-col gap-2 flex-1">
              <h2 className="text-lg font-bold text-gray-900">{video.title}</h2>

              <div className="flex items-center gap-2 text-gray-600 text-sm">
                {video.authors.length > 0 && (
                  <>
                    <p className="font-medium">
                      {video.authors[0].profile_name}
                    </p>
                    {video.authors[0].verified && (
                      <img
                        className="w-4 h-4"
                        src={verifiedIcon}
                        alt="Verified"
                      />
                    )}
                  </>
                )}
              </div>

              {video.others.views && (
                <p className="text-gray-500 text-sm">
                  {video.others.views} views
                </p>
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
