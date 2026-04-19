import { lazy, memo, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const FileDropZone = lazy(() => import("../../pages/FileDropZone"));
const UsersList = lazy(() => import("../../pages/UsersList"));

import { ROUTES } from "./routes.config";
import Loader from "../Loader";

function AppRouter() {
  return (
    <Suspense fallback={<Loader width={200} />}>
      <Routes>
        <Route path={ROUTES.HOME} element={<FileDropZone />} />
        <Route path={ROUTES.TABLE_ID} element={<UsersList />} />
      </Routes>
    </Suspense>
  );
}
export default memo(AppRouter);
