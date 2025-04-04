import { Modal } from "antd";
import NiceModal, { useModal } from "@ebay/nice-modal-react";

const VideoDetails = NiceModal.create(({ id }: { id: string }) => {
  const modal = useModal();
  return (
    <Modal
      title="Hello Antd"
      open={modal.visible}
      onOk={modal.hide}
      onCancel={modal.hide}
      afterClose={modal.remove}
    >
      Greetings: {id}!
    </Modal>
  );
});

export default VideoDetails;
