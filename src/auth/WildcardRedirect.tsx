import { Navigate, useLocation } from "react-router-dom";

/** مسارات غير معروفة: توجيه حسب مسار الطالب أو صفحة دخول المحاضر */
export function WildcardRedirect() {
  const { pathname } = useLocation();
  if (pathname.startsWith("/student")) {
    return <Navigate to="/student/login" replace />;
  }
  return <Navigate to="/login" replace />;
}
