import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Login from './components/forms/Login'
import Signup from './components/forms/Signup';
import Main from './components/main/Main'
import Collections from './components/main/Collections';
import RestaurantPage from './components/main/restaurants/RestaurantPage';
import ManageRestaurant from './components/admin/ManageRestaurant';
import ManageReview from './components/admin/ManageReview';
import ManageUser from './components/admin/ManageUser';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="manageRestaurant" element={<ManageRestaurant />} />
              <Route path="manageReview" element={<ManageReview />} />
              <Route path="manageUser" element={<ManageUser />} />
              <Route path="restaurantPage" element={<RestaurantPage />} />
              <Route path="collections" element={<Collections />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
