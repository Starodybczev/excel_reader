import { memo, useState, type ChangeEvent } from 'react'
import { useExcelReader, type AssetRow } from '../utils'


export type AssetsType = {
  id: string,
  name: string,
  rows: AssetRow[]
}

export interface DataListProps {
  DataUsers: (assets : AssetsType[]) => void
}


function FileReaderList({DataUsers}: DataListProps) {
  const [assets, setAssets] = useState<AssetsType[]>([])
  const { readExcel } = useExcelReader<AssetRow>()

  const handleCheckFile = async(e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return

    const excelData =  await readExcel(file)
    const rowWithInd = excelData.map((row) => ({
      ...row,
      id: `row-${crypto.randomUUID()}`
    }))
    const newAsset: AssetsType = {
      id: crypto.randomUUID(),
      name: file.name,
      rows: rowWithInd
    }

    const updateAssets = [newAsset]
    setAssets(updateAssets)
    DataUsers(updateAssets)

  }

  return (
    <form>
      <input type="file" onChange={handleCheckFile} accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
    </form>
  )
}
export default memo(FileReaderList)
