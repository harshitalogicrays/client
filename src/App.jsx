import { Route, Routes } from "react-router-dom"
import Header from "./components/Header"
import Home from "./components/Home"
import Login from "./components/Login"
import Signup from "./components/Signup"
import PageNotFound from "./components/PageNotFound"
import ProductsList from "./components/ProductsList"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from "./components/Admin/Dashboard"
import ViewCategories from "./components/Admin/ViewCategories"
import AddCategory from "./components/Admin/AddCategory"
import AddProduct from "./components/Admin/AddProduct"
import AddSlider from "./components/Admin/AddSlider"
import ViewSlider from "./components/Admin/ViewSlider"
import ViewProducts from "./components/Admin/ViewProducts"
import Cart from "./components/Cart"
import CheckoutDetails from "./components/CheckoutDetails"
import { Protected } from "./components/HiddenLinks"
import ProductDetails from './components/ProductDetails'
import Checkout from "./components/Checkout"
import CheckoutSuccess from "./components/CheckoutSuccess"
import MyOrders from "./components/MyOrders"
import MyOrderDetails from "./components/MyOrderDetails"
import Orders from "./components/Admin/Orders"
import OrderDetails from "./components/Admin/OrderDetails"
function App() {

  return (
   <>
   <ToastContainer position="bottom-left" autoClose={2000} hideProgressBar={true}
    newestOnTop={false} closeOnClick  rtl={false}  pauseOnFocusLoss={false}
    draggable   pauseOnHover={false} theme="colored"/>
    <Header/>
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<ProductsList/>}/>
        <Route path='/product-details/:id' element={<ProductDetails/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/> 
        <Route path='/admin'element={<Dashboard/>}>
            <Route path='viewcategories'  element={<ViewCategories/>} />
            <Route path='addcategory'  element={<AddCategory/>} />
            <Route path='editcategory/:id'  element={<AddCategory/>} />
            <Route path='addproduct'  element={<AddProduct/>} />
            <Route path='editproduct/:id'  element={<AddProduct/>} />
            <Route path='addslider'  element={<AddSlider/>} />
            <Route path='viewsliders'  element={<ViewSlider/>} />
            <Route path='editslider/:id'  element={<AddSlider/>} />
            <Route path='viewproducts'  element={<ViewProducts/>} />
            <Route path='orders'  element={<Orders/>} />
            <Route path='orders/details/:id'  element={<OrderDetails/>} />
        </Route>

        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout-details' element={<Protected><CheckoutDetails/></Protected>}/>
        <Route path='/checkout' element={<Protected><Checkout/></Protected>}/>
        <Route path='/checkout-success' element={<Protected><CheckoutSuccess/></Protected>}/>
        <Route path='/myorders' element={<Protected><MyOrders/></Protected>}/>
        <Route path='/myorders/details/:id' element={<Protected><MyOrderDetails/></Protected>}/>
        <Route path="*" element={<PageNotFound/>}/>
    </Routes>
   </>
  )
}

export default App
