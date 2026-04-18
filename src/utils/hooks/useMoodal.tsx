import { useCallback, useMemo, useState } from "react";

export function useMoodal() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpenModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleToggalModal = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  return useMemo(
    () => ({
      handleCloseModal,
      handleOpenModal,
      handleToggalModal,
      isOpen,
      setIsOpen,
    }),
    [handleCloseModal, handleOpenModal, handleToggalModal, isOpen, setIsOpen],
  );
}
