import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import ApplicationsPage from "./pages/ApplicationsPage.jsx";
import AddApplicationPage from "./pages/AddApplicationPage.jsx";
import EditApplicationPage from "./pages/EditApplicationPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<ApplicationsPage />} />
          <Route path="/add" element={<AddApplicationPage />} />
          <Route path="/edit/:id" element={<EditApplicationPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
