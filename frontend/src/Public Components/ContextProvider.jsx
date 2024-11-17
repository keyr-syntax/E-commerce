import { createContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const ProductContext = createContext();

// eslint-disable-next-line react/prop-types
function ContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [allUsersByAdmin, setAllUsersByAdmin] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [totalSales, setTotalSales] = useState([]);
  const [salesByDate, setSalesByDate] = useState([]);
  const [salesByWeek, setSalesByWeek] = useState([]);
  const [salesByMonth, setSalesByMonth] = useState([]);
  const [salesByYear, setSalesByYear] = useState([]);
  const [ordersByDate, setOrdersByDate] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [filterByCategory, setFilterByCategory] = useState([]);
  const [numberOfProductsInCategory, setNumberOfProductsInCategory] = useState(
    []
  );
  const [filteredById, setFilteredById] = useState([]);
  const [sliderImage, setSliderImage] = useState([]);
  const [alt, setAlt] = useState("");
  const [error, setError] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(0);
  const [allOrders, setAllOrders] = useState([]);
  const [paidOrders, setPaidOrders] = useState([]);
  const [unPaidOrders, setUnPaidOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [notDeliveredOrders, setNotDeliveredOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [newlyRegisteredUser, setNewlyRegisteredUser] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [orderDetails, setOrderDetails] = useState([]);
  // const API_URL = "http://localhost:5000";
  // const API_URL = "https://n8gx23hb-5000.inc1.devtunnels.ms";
  const API_URL = "https://e-commerce-backend-seven-theta.vercel.app";
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    fetchSalesByDate();
    fetchSalesByWeek();
    fetchSalesByMonth();
    fetchSalesByYear();
    fetchOrdersByDate();
  }, []);

  const fetchAllNotificationsForNewOrder = async () => {
    try {
      const data = await fetch(
        `${API_URL}/api/notification/allordernotifications`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const response = await data.json();
      if (response.success) {
        setNotifications(response.allNotificationsForNewOrder);
        setNewlyRegisteredUser(response.allNotificationsForNewUserRegistration);

        const unreadOrders = response.allNotificationsForNewOrder.filter(
          (notification) => notification.read === false
        ).length;

        const unreadNewUser =
          response.allNotificationsForNewUserRegistration.filter(
            (newuser) => newuser.read === false
          ).length;
        const totalNotifications = unreadOrders + unreadNewUser;
        setUnreadNotifications(totalNotifications);

        console.log("Number of Unread user", unreadNewUser);
        console.log("Number of Unread orders", unreadOrders);
        console.log(
          "All user notifications fetched successfully!",
          response.allNotificationsForNewUserRegistration
        );
      }
    } catch (error) {
      console.log("Failed to fetch all notifications", error);
    }
  };
  const markMessageAsSeen = async (_id) => {
    try {
      const data = await fetch(
        `${API_URL}/api/notification/markmessageasseen/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const response = await data.json();
      if (response.success) {
        fetchAllNotificationsForNewOrder();
      }
    } catch (error) {
      console.log("Failed to mark message as seen", error.message);
    }
  };
  const markUserAsSeen = async (_id) => {
    try {
      const data = await fetch(
        `${API_URL}/api/notification/markuserasseen/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const response = await data.json();
      if (response.success) {
        // setUnreadNotifications((previous) => previous - 1);
        fetchAllNotificationsForNewOrder();
      }
    } catch (error) {
      console.log("Failed to mark user as seen", error.message);
    }
  };

  const fetchSalesByDate = async () => {
    try {
      const data = await fetch(`${API_URL}/api/order/salesbydate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await data.json();
      if (response.success) {
        setSalesByDate(response.fetchSalesByDate);
        console.log("Salesby date", response.fetchSalesByDate);
      }
    } catch (error) {
      console.log("Error while fetching sales by date", error.message);
    }
  };

  const fetchSalesByWeek = async () => {
    try {
      const data = await fetch(`${API_URL}/api/order/salesbyweek`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await data.json();
      if (response.success) {
        setSalesByWeek(response.fetchSalesByWeek);
        console.log("Sales by week", response.fetchSalesByWeek);
      }
    } catch (error) {
      console.log("Error while fetching sales by week", error.message);
    }
  };
  const fetchSalesByMonth = async () => {
    try {
      const data = await fetch(`${API_URL}/api/order/salesbymonth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await data.json();
      if (response.success) {
        setSalesByMonth(response.fetchSalesByMonth);
        console.log("Sales by month", response.fetchSalesByMonth);
      }
    } catch (error) {
      console.log("Error while fetching sales by month", error.message);
    }
  };
  const fetchSalesByYear = async () => {
    try {
      const data = await fetch(`${API_URL}/api/order/salesbyyear`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await data.json();
      if (response.success) {
        setSalesByYear(response.fetchSalesByYear);
        console.log("Sales by year", response.fetchSalesByYear);
      }
    } catch (error) {
      console.log("Error while fetching sales by year", error.message);
    }
  };

  const fetchOrdersByDate = async () => {
    try {
      const data = await fetch(`${API_URL}/api/order/ordersbydate`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await data.json();
      if (response.success) {
        setOrdersByDate(response.OrdersByDate);
        console.log("Orders by date", response.OrdersByDate);
      }
    } catch (error) {
      console.log("Error while fetching Orders by date", error.message);
    }
  };

  const fetchAllOrdersForAdmin = async () => {
    try {
      const data = await fetch(`${API_URL}/api/order/fetchallorders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await data.json();
      if (response.success) {
        setAllOrders(response.allOrders);
        const allOrdersForFilter = response.allOrders;
        const PAIDORDERS = allOrdersForFilter.filter(
          (order) => order.isPaid && order.isDelivered === true
        );
        setPaidOrders(PAIDORDERS);
        const UNPAIDORDERS = allOrdersForFilter.filter(
          (order) => order.isPaid === false
        );

        setUnPaidOrders(UNPAIDORDERS);
        const DELIVEREDORDERS = allOrdersForFilter.filter(
          (order) => order.isDelivered === true
        );

        setDeliveredOrders(DELIVEREDORDERS);
        const NOTDELIVEREDORDERS = allOrdersForFilter.filter(
          (order) => order.isDelivered === false
        );

        setNotDeliveredOrders(NOTDELIVEREDORDERS);
        fetchTotalSalesByAdmin();
        fetchOrdersByDate();
        fetchSalesByDate();
        fetchSalesByWeek();
        fetchSalesByMonth();
        fetchSalesByYear();
        fetchOrdersByDate();
        fetchAllUsersByAdmin();
        fetchAllNotificationsForNewOrder();
        console.log("All orders fetched successfully", response.allOrders);
      }
    } catch (error) {
      console.log("Error while fetching all orders", error.message);
    }
  };

  useEffect(() => {
    fetchAllOrdersForAdmin();
  }, []);

  const handleOrderDetails = async (_id) => {
    try {
      const data = await fetch(`${API_URL}/api/order/orderbyid/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await data.json();
      if (response.success) {
        setOrderDetails(response.orderById);
        console.log("Order detail fetched", response.orderById);
      }
    } catch (error) {
      console.log("Error fetching order details", error);
    }
  };
  const markAsPaid = async (_id) => {
    try {
      const data = await fetch(
        `${API_URL}/api/order/changeorderstatustopaid/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const response = await data.json();
      if (response.success) {
        fetchAllOrdersForAdmin();
        setOrderDetails(response.orderStatusChangedToPaid);
      }
    } catch (error) {
      console.log("Error while marking as paid", error.message);
    }
  };
  const markAsDelivered = async (_id) => {
    try {
      const data = await fetch(
        `${API_URL}/api/order/changeorderstatustodelivered/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const response = await data.json();
      if (response.success) {
        fetchAllOrdersForAdmin();
        setOrderDetails(response.orderDelivered);
      }
    } catch (error) {
      console.log("Error while marking as delivered", error.message);
    }
  };
  const reversePaymentStatusToUnpaid = async (_id) => {
    try {
      const data = await fetch(
        `${API_URL}/api/order/reversepaymentstatustounpaid/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const response = await data.json();
      if (response.success) {
        fetchAllOrdersForAdmin();
        setOrderDetails(response.reversedPaymentStatus);
      }
    } catch (error) {
      console.log("Error while reversing payment status", error.message);
    }
  };
  const reverseDeliveryStatusToNotDelivered = async (_id) => {
    try {
      const data = await fetch(
        `${API_URL}/api/order/reversedeliverystatustonotdelivered/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const response = await data.json();
      if (response.success) {
        fetchAllOrdersForAdmin();
        setOrderDetails(response.reversedDeliveryStatus);
      }
    } catch (error) {
      console.log("Error while reversing delivery status", error.message);
    }
  };
  const deleteOrdersByAdmin = async (_id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        const data = await fetch(
          `${API_URL}/api/order/deleteorderbyadmin/${_id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        const response = await data.json();
        if (response.success) {
          fetchAllOrdersForAdmin();
          fetchTotalSalesByAdmin();
          // navigate("/admin/order");
        }
      } catch (error) {
        console.log("Error while deleting orders", error.message);
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      setError("Failed to save favorites to Local Storage", error.message);
    }
  }, [favorites]);

  useEffect(() => {
    fetchAllProductsFordisplay();
  }, []);

  const fetchAllProductsFordisplay = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/product/fetchallproducts`
      );
      if (response.data.success) {
        const images = response.data.allProducts.map(
          (product) => product.image
        );
        const altText = response.data.allProducts.map((text) => text.name);
        setAllProducts(response.data.allProducts);
        setSliderImage(images);
        setAlt(altText);
        console.log(
          "All products fetched successfully!",
          response.data.allProducts
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchAllUsersByAdmin();
  }, []);

  const fetchAllUsersByAdmin = async () => {
    try {
      const data = await fetch(`${API_URL}/api/user/getallusers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await data.json();
      if (response.success) {
        setAllUsersByAdmin(response.fetchAllUsers);
        console.log("All users fetched successfully!", response.fetchAllUsers);
      }
    } catch (error) {
      console.log("Error while fetching all users", error.message);
    }
  };
  useEffect(() => {
    fetchTotalSalesByAdmin();
  }, []);

  const fetchTotalSalesByAdmin = async () => {
    try {
      const data = await fetch(`${API_URL}/api/order/totalsales`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const response = await data.json();
      if (response.success) {
        setTotalSales(response.totalSales);
        console.log("Total sales fetched successfully!", response.totalSales);
      }
    } catch (error) {
      console.log("Error while fetching total sales", error.message);
    }
  };

  useEffect(() => {
    fetchAllProductCategory();
  }, []);

  useEffect(() => {
    filterProductsById();
  }, []);

  const fetchAllProductCategory = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/category/listallcategory`
      );

      if (response.data.success) {
        setAllCategories(response.data.fetchAllCategory);
        console.log(
          "All categories fetched successfully!",
          response.data.fetchAllCategory
        );
      }
    } catch (error) {
      console.log("Error while fetching all categories", error.message);
    }
  };

  const filterProductsByCategory = (category) => {
    const filteredByCategory = allProducts.filter(
      (product) => product.category === category
    );
    setFilterByCategory(filteredByCategory);
    setNumberOfProductsInCategory(filteredByCategory.length);
  };

  const filterProductsById = (_id) => {
    const filteredItemById = allProducts.find((product) => product._id === _id);
    setFilteredById(filteredItemById);
    console.log("Filtered by ID", filteredItemById);
  };

  useEffect(() => {
    userAuthentication();
  }, []);

  const userAuthentication = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const data = await fetch(`${API_URL}/api/user/userauthentication`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const response = await data.json();
        if (response.success) {
          setUser(response.user);
          setIsLoggedIn(true);
          setIsAdmin(response.user.isAdmin);
          // navigate(response.user.isAdmin ? "/sidebar" : "/");
          console.log("user", response.user);
        }
      }
    } catch (error) {
      console.log("Error while authenticating user:", error.message);
    }
  };

  const addToFavorites = (product) => {
    setFavorites((prevFavorites) => {
      if (!prevFavorites.some((item) => item._id === product._id)) {
        return [...prevFavorites, product];
      }
      return prevFavorites;
    });
  };
  const removeFromFavorites = (productId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item._id !== productId)
    );
  };
  const isFavorite = (productId) => {
    return favorites.some((item) => item._id === productId);
  };

  const addToCart = (product) => {
    if (product.price < 0) {
      setError("Product price cannot be negative. Setting price to 0.");
      product.price = 0;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id);
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: calculateSubtotal({
                  ...item,
                  quantity: item.quantity + 1,
                }),
              }
            : item
        );
      }
      return [
        ...prevCart,
        {
          ...product,
          quantity: 1,
          subtotal: calculateSubtotal({ ...product, quantity: 1 }),
        },
      ];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, newQuantity, countInStock) => {
    if (newQuantity < 1) {
      setError("Minimum order quantity should be 1.");
      newQuantity = 1;
    } else if (newQuantity > countInStock) {
      setError(`Maximum Stock quantity for this product is  ${countInStock}`);
      newQuantity = countInStock;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity: newQuantity,
              subtotal: calculateSubtotal({ ...item, quantity: newQuantity }),
            }
          : item
      )
    );
  };

  const calculateSubtotal = (item) => {
    return Math.max(0, item.price) * Math.max(0, item.quantity);
  };

  const totalCost = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const totalItems = cart.reduce(
    (total, item) => total + Math.max(0, item.quantity),
    0
  );
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? "star filled" : "star"}>
          ★
        </span>
      );
    }
    return stars;
  };
  const clearError = () => {
    setError(null);
  };
  const Logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
  };
  return (
    <>
      <ProductContext.Provider
        value={{
          cart,
          setCart,
          totalCost,
          totalItems,
          addToCart,
          removeFromCart,
          updateQuantity,
          API_URL,
          allProducts,
          fetchAllProductsFordisplay,
          allCategories,
          fetchAllProductCategory,
          sliderImage,
          alt,
          filterByCategory,
          filterProductsByCategory,
          clearError,
          error,
          favorites,
          addToFavorites,
          removeFromFavorites,
          isFavorite,
          filterProductsById,
          filteredById,
          renderStars,
          isAdmin,
          setIsAdmin,
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser,
          numberOfProductsInCategory,
          orderItems,
          setOrderItems,
          subtotal,
          setSubtotal,
          totalPrice,
          setTotalPrice,
          tax,
          setTax,
          shippingPrice,
          setShippingPrice,
          fetchAllOrdersForAdmin,
          allOrders,
          Logout,
          allUsersByAdmin,
          totalSales,
          fetchTotalSalesByAdmin,
          paidOrders,
          unPaidOrders,
          deliveredOrders,
          notDeliveredOrders,
          markAsPaid,
          markAsDelivered,
          reversePaymentStatusToUnpaid,
          reverseDeliveryStatusToNotDelivered,
          deleteOrdersByAdmin,
          salesByDate,
          salesByWeek,
          salesByMonth,
          ordersByDate,
          salesByYear,
          unreadNotifications,
          notifications,
          fetchAllNotificationsForNewOrder,
          markMessageAsSeen,
          newlyRegisteredUser,
          markUserAsSeen,
          orderDetails,
          handleOrderDetails,
        }}
      >
        {children}
      </ProductContext.Provider>
    </>
  );
}

export default ContextProvider;
