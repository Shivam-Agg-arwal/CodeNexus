import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from './pages/Home'
import SignUpPage from "./pages/SignUpPage";
import Navbar from "./components/core/common/Navbar";
import LoginPage from "./pages/LoginPage";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./AuthenticationRoutes/ProtectedRoute";
import MyProfile from "./components/core/Dashboard/MyProfile";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import PurchaseHistory from "./components/core/Dashboard/PurchaseHistory";
import Settings from "./components/core/Dashboard/Settings";
import Contact from "./pages/Contact";
import Error from "./pages/Error"
import { useSelector } from "react-redux";
import MyCourses from "./components/core/Dashboard/MyCourses/MyCourses";
import EditCourse from "./components/core/Dashboard/MyCourses/EditCourse";
import AddCourse from "./components/core/Dashboard/CourseCreation.jsx/AddCourse";
import CatalogPage from "./components/core/Category/CatalogPage";

function App() {
	const { user } = useSelector((state) => state.profile);
	return (
		<div className="w-screen min-h-screen font-inter overflow-x-hidden h-screen">
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/signup" element={<SignUpPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/about" element={<About />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/verify-email" element={<VerifyEmail />} />
				<Route path="/forgot-password" element={<ForgotPassword />} />
				<Route path="/update-password/:id" element={<UpdatePassword />} />
				<Route path="/catalog/:catalogName" element={<CatalogPage />} />

				<Route element={
					<ProtectedRoute>
						<Dashboard />
					</ProtectedRoute>
				}>

					<Route path="/dashboard/my-profile" element={<MyProfile />} />
					<Route path="/dashboard/enrolled-courses" element={<EnrolledCourses />} />
					<Route path="/dashboard/purchase-history" element={<PurchaseHistory />} />
					<Route path="/dashboard/settings" element={<Settings />} />


					{user && user.accountType === "Instructor" && (<Route path="/dashboard/add-course" element={<AddCourse />} />)}
					{user && user.accountType === "Instructor" && (<Route path="/dashboard/my-courses" element={<MyCourses />} />)}
					{user && user.accountType === "Instructor" && (<Route path="/dashboard/edit-course/:courseID" element={<EditCourse />} />)}


				</Route>
				<Route element={<Error />} path="*" />

			</Routes>
		</div>
	);
}

export default App;
