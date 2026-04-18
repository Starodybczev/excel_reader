import { lazy, memo, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const FileDropZone = lazy(() => import("../../pages/FileDropZone"));
const UsersList = lazy(() => import("../../pages/UsersList"));

function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Suspense fallback={"louding"}>
            <FileDropZone />
          </Suspense>
        }
      />
      <Route
        path="/file/:id"
        element={
          <Suspense fallback={"louding"}>
            <UsersList />
          </Suspense>
        }
      />
    </Routes>
  );
}
export default memo(AppRouter);
