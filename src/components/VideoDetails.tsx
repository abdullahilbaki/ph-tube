import { Modal } from "antd";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useState, useEffect } from "react";
import { ClockLoader } from "react-spinners";
import verifiedIcon from "../assets/verified.svg";

interface ApiResponse {
  status: boolean;
  message: string;
  video?: {
    category_id: string;
    video_id: string;
    thumbnail: string;
    title: string;
    authors: {
      profile_picture: string;
      profile_name: string;
      verified: boolean;
    }[];
    others: {
      views: string;
      posted_date: string;
    };
    description: string;
  };
}

const VideoDetails = NiceModal.create(({ id }: { id: string }) => {
  const modal = useModal();
  const [videoData, setVideoData] = useState<ApiResponse["video"] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: ApiResponse = await response.json();
        if (data.status && data.video) {
          setVideoData(data.video);
        } else {
          setError(
            data.message ||
              "Failed to fetch video details: Invalid API response."
          );
        }
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(`Failed to fetch video details: ${err.message}`);
        } else {
          setError("Failed to fetch video details: An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [id]);

  if (loading) {
    return (
      <Modal
        title="Fetching Video Details..."
        open={modal.visible}
        onCancel={modal.hide}
        footer={null}
      >
        <div className="flex flex-col items-center gap-4">
          <ClockLoader />
          <p className="text-gray-600">Please wait while we load the video.</p>
        </div>
      </Modal>
    );
  }

  if (error) {
    return (
      <Modal
        title="Error"
        open={modal.visible}
        onOk={modal.hide}
        onCancel={modal.hide}
        afterClose={modal.remove}
      >
        {error}
      </Modal>
    );
  }

  if (!videoData) {
    return (
      <Modal
        title="No Data"
        open={modal.visible}
        onOk={modal.hide}
        onCancel={modal.hide}
        afterClose={modal.remove}
      >
        No video data available.
      </Modal>
    );
  }

  const date = videoData.others.posted_date
    ? new Date(Number(videoData.others.posted_date) * 1000).toLocaleDateString()
    : "Unknown Date";

  return (
    <Modal
      title={videoData.title}
      open={modal.visible}
      onOk={modal.hide}
      onCancel={modal.hide}
      afterClose={modal.remove}
    >
      <div className="flex flex-col gap-2">
        <img
          src={videoData.thumbnail}
          alt={videoData.title}
          className="w-full h-64 object-cover"
        />

        <p>
          <strong>Description:</strong> {videoData.description}
        </p>

        <div className="flex flex-col-reverse sm:flex-row sm:items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <img
              className="w-12 h-12 object-cover rounded-full border border-gray-200"
              src={videoData.authors[0].profile_picture}
              alt={videoData.authors[0].profile_name}
            />
            <p className="text-gray-900 font-semibold text-lg">
              {videoData.authors[0].profile_name}
            </p>
            {videoData.authors[0].verified && (
              <img className="w-4 h-4" src={verifiedIcon} alt="Verified" />
            )}{" "}
          </div>

          <p className="text-sm text-gray-600">
            {date} <span className="font-bold text-lg text-black"> - </span>{" "}
            {videoData.others.views} views
          </p>
        </div>
      </div>
    </Modal>
  );
});

export default VideoDetails;
