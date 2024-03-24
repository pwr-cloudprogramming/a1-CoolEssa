import { AnimatePresence } from "framer-motion";
import NotificationModal from "../../../shared/components/modals/NotificationModal";
import useNotificationModal from "../../../shared/hooks/useNotificationModal";

const RoomCodeModals = () => {
  const { isNotificationModalOpen } = useNotificationModal();
  return (
    <AnimatePresence exitBeforeEnter>
      {isNotificationModalOpen && <NotificationModal />}
    </AnimatePresence>
  );
};

export default RoomCodeModals;
