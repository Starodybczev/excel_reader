import { useCallback, useRef, type ChangeEvent, type Dispatch, type SetStateAction } from 'react'
import type { AssetRow } from '../hooks';

type Props = {
    setNewRow: Dispatch<SetStateAction<AssetRow>>
}

export default function rememberSelectImage({setNewRow} : Props) {
    const fileRef = useRef<HTMLInputElement | null>(null)

    const handleUPloadImages = useCallback(( fieldName: string, e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return;

        const uploadImage = ["image/png", "image/jpeg"]
        if (!uploadImage.includes(file.type)) {
            alert("only PNG JPEG ")
            return;
        }
        const reader = new FileReader()
        reader.onload = () => {
            setNewRow((prev) => ({ ...prev, [fieldName]: reader.result as string })
            )
        }
        reader.readAsDataURL(file)
    }, [setNewRow])

    const handleReset = useCallback(() => {
        if(fileRef.current){
            fileRef.current.value = ""
        }
    }, [fileRef])

    const props = { handleUPloadImages, handleReset, fileRef }

    return { ...props }
}
