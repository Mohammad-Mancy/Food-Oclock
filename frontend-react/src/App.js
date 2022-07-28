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
import EditProfile from './components/main/EditProfile';
import ManageCollection from './components/admin/ManageCollection';
import RestaurantByCollection from './components/main/RestaurantByCollection';
import AddCollecionForm from './components/admin/forms/AddCollecionForm';
import EditCollectionForm from './components/admin/forms/EditCollectionForm';
import AddRestaurantForm from './components/admin/forms/AddRestaurantForm';
import Map from './components/main/Map'
import EditRestaurantForm from './components/admin/forms/EditRestaurantForm';
import RestaurantsList from './components/main/RestaurantsList'

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="map" element={<Map />} />
              <Route path="manageRestaurant" element={<ManageRestaurant />} />
              <Route path="manageReview" element={<ManageReview />} />
              <Route path="manageUser" element={<ManageUser />} />
              <Route path="manageCollection" element={<ManageCollection />} />
              <Route path="addCollectionForm" element={<AddCollecionForm />} />
              <Route path="addRestaurantForm" element={<AddRestaurantForm />} />
              <Route path="editCollectionForm" element={<EditCollectionForm />} />
              <Route path="editRestaurantForm" element={<EditRestaurantForm />} /> 
              <Route path="editprofile" element={<EditProfile />} />
              <Route path="restaurantPage" element={<RestaurantPage />} />
              <Route path="collections" element={<Collections />} />
              <Route path="restaurantsList" element={<RestaurantsList />} />
              <Route path="restaurantByCollection" element={<RestaurantByCollection />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
