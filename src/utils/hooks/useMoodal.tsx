import { useCallback, useState } from 'react'

export function useMoodal() {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const handleOpenModal = useCallback(() => {
        setIsOpen(true)
    }, [])

    const handleCloseModal = useCallback(() => {
        setIsOpen(false)
    }, [])


    const handleToggalModal = useCallback(() => {
        setIsOpen((prev) => !prev)
    }, [])

    const props = { handleCloseModal, handleOpenModal, handleToggalModal, isOpen, setIsOpen }

    return { ...props }
}
