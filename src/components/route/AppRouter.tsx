import { lazy, memo, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const FileDropZone = lazy(() => import("../../pages/FileDropZone"));
const UsersList = lazy(() => import("../../pages/UsersList"));

import { ROUTES } from "./routes.config";
import Loader from "../Loader";
import OptionListSelect from "../../pages/OptionListSelect";
import SelectOptionCreate from "../../pages/SelectOptionCreate";
import ErrorPage from "../../pages/ErrorPage";

function AppRouter() {
  return (
    <Suspense fallback={<Loader width={200} />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<OptionListSelect />} />
        <Route path={ROUTES.SELECT} element={<FileDropZone />} />
        <Route path={ROUTES.CREATE_TABLE} element={<SelectOptionCreate />} />
        <Route path={ROUTES.SELECT_FILE} element={<UsersList />} />
        <Route path={ROUTES.CREATE_FILE} element={<UsersList />} />
        <Route path={ROUTES.ERROR} element={<ErrorPage />} />
      </Routes>
    </Suspense>
  );
}
export default memo(AppRouter);
