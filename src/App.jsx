import { useState } from "react";


const productsData = [
    {
       image: {
            thumbnail: "/images/image-waffle-thumbnail.jpg",
            mobile: "/images/image-waffle-mobile.jpg",
            tablet: "/images/image-waffle-tablet.jpg",
            desktop: "/images/image-waffle-desktop.jpg"
       },
       name: "Waffle with Berries",
       category: "Waffle",
       price: 6.50
    },
    {
        image: {
            thumbnail: "/images/image-creme-brulee-thumbnail.jpg",
            mobile: "/images/image-creme-brulee-mobile.jpg",
            tablet: "/images/image-creme-brulee-tablet.jpg",
            desktop: "/images/image-creme-brulee-desktop.jpg"
        },
        name: "Vanilla Bean Crème Brûlée",
        category: "Crème Brûlée",
        price: 7.00
     },
     {
        image: {
            thumbnail: "/images/image-macaron-thumbnail.jpg",
            mobile: "/images/image-macaron-mobile.jpg",
            tablet: "/images/image-macaron-tablet.jpg",
            desktop: "/images/image-macaron-desktop.jpg"
        },
        name: "Macaron Mix of Five",
        category: "Macaron",
        price: 8.00
     },
     {
        image: {
            thumbnail: "/images/image-tiramisu-thumbnail.jpg",
            mobile: "/images/image-tiramisu-mobile.jpg",
            tablet: "/images/image-tiramisu-tablet.jpg",
            desktop: "/images/image-tiramisu-desktop.jpg"
        },
        name: "Classic Tiramisu",
        category: "Tiramisu",
        price: 5.50
     },
     {
        image: {
            thumbnail: "/images/image-baklava-thumbnail.jpg",
            mobile: "/images/image-baklava-mobile.jpg",
            tablet: "/images/image-baklava-tablet.jpg",
            desktop: "/images/image-baklava-desktop.jpg"
        },
        name: "Pistachio Baklava",
        category: "Baklava",
        price: 4.00
     },
     {
        image: {
            thumbnail: "/images/image-meringue-thumbnail.jpg",
            mobile: "/images/image-meringue-mobile.jpg",
            tablet: "/images/image-meringue-tablet.jpg",
            desktop: "/images/image-meringue-desktop.jpg"
        },
        name: "Lemon Meringue Pie",
        category: "Pie",
        price: 5.00
     },
     {
        image: {
            thumbnail: "/images/image-cake-thumbnail.jpg",
            mobile: "/images/image-cake-mobile.jpg",
            tablet: "/images/image-cake-tablet.jpg",
            desktop: "/images/image-cake-desktop.jpg"
        },
        name: "Red Velvet Cake",
        category: "Cake",
        price: 4.50
     },
     {
        image: {
            thumbnail: "/images/image-brownie-thumbnail.jpg",
            mobile: "/images/image-brownie-mobile.jpg",
            tablet: "/images/image-brownie-tablet.jpg",
            desktop: "/images/image-brownie-desktop.jpg"
        },
        name: "Salted Caramel Brownie",
        category: "Brownie",
        price: 4.50
     },
     {
        image: {
            thumbnail: "/images/image-panna-cotta-thumbnail.jpg",
            mobile: "/images/image-panna-cotta-mobile.jpg",
            tablet: "/images/image-panna-cotta-tablet.jpg",
            desktop: "/images/image-panna-cotta-desktop.jpg"
        },
        name: "Vanilla Panna Cotta",
        category: "Panna Cotta",
        price: 6.50
     }
];


export default function App() {
  const [showConfirmation, setShowConfirmation] = useState(false); 
  const [cartItems, setCartItems] = useState([]);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [cartButton, setCartButton] = useState(false);


   const removeFromCart = (productName) => {
    setCartItems(prev => prev.filter(item => item.product.name !== productName));
  };

    const confirmOrder = () => {
    if (cartItems.length === 0) return;
    setShowConfirmation(true);
    // Optionally: send order to backend here in real app
  };

   const startNewOrder = () => {
    setCartItems([]);               
    setShowConfirmation(false); 
    setCartButton(false);   
  };

  function handleHome() {
    setCartButton(false);
  }

  return (
    <div className=" m-auto w-[90%]">
      { cartButton ? (
       <div>
         <Header totalItems={totalItems} cartButton={cartButton} setCartButton={setCartButton} handleHome={handleHome}/>
         <Cart
          cartItems={cartItems}
          totalItems={totalItems}
          removeFromCart={removeFromCart}
          confirmOrder={confirmOrder}   
        />
         {showConfirmation && (
        <OrderConfirmation
          cartItems={cartItems}
          totalPrice={cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
          onStartNewOrder={startNewOrder}
        />
      )}
      </div>
      ) : (
      <div>
      <Header totalItems={totalItems} cartButton={cartButton} setCartButton={setCartButton}/>
      <Menu totalItems={totalItems} setCartItems={setCartItems} cartItems={cartItems} showConfirmation={showConfirmation} setShowConfirmation={setShowConfirmation} startNewOrder={startNewOrder} confirmOrder={confirm} />
      </div>
      )
}
    </div>
  )
}


function Header( { totalItems, setCartButton, handleHome }) {
  // const [cartButton, setCartButton] = useState(false);

  function handleCartButton() {
    setCartButton(true);
  }

  return(
    <div className="mb-10 flex justify-between">
      <h1 className=" text-3xl mt-5 font-bold " onClick={handleHome}>Desserts</h1>
      <button className="border relative rounded-lg mt-5 p-3 bg-black"
      onClick={handleCartButton}><img src="./assets\images\icon-add-to-cart.svg" alt="" /> <span className="text-red-600 font-bold absolute bottom-0 right-0.5">{totalItems}</span></button>
    </div>
  );
}


function Menu({ totalItems, cartItems, setCartItems, showConfirmation, setShowConfirmation }) {
  const products = productsData;
  // const [cartItems, setCartItems] = useState([]);
  // const [showConfirmation, setShowConfirmation] = useState(false);  // ← new state

  const addToCart = (product, changeBy = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.name === product.name);
      if (existing) {
        const newQty = existing.quantity + changeBy;
        if (newQty <= 0) {
          return prev.filter(item => item.product.name !== product.name);
        }
        return prev.map(item =>
          item.product.name === product.name ? { ...item, quantity: newQty } : item
        );
      }
      if (changeBy > 0) {
        return [...prev, { product, quantity: 1 }];
      }
      return prev;
    });
  };

  const removeFromCart = (productName) => {
    setCartItems(prev => prev.filter(item => item.product.name !== productName));
  };

  const confirmOrder = () => {
    if (cartItems.length === 0) return;
    setShowConfirmation(true);
    // Optionally: send order to backend here in real app
  };

  const startNewOrder = () => {
    setCartItems([]);               
    setShowConfirmation(false);    
  };

  // const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="lg:flex gap-8 relative">
      <div className="lg:grid grid-cols-3 gap-5 flex-4/4">
        {products.map((product) => (
          <Productcard
            key={product.name}
            productObj={product}
            addToCart={addToCart}
            quantityInCart={cartItems.find(c => c.product.name === product.name)?.quantity ?? 0}
          />
        ))}
      </div>

      <div className=" bg-white rounded-lg mb-10 lg:sticky lg:top-5 lg:self-start lg:w-95 lg:max-h-[85vh] overflow-y-auto">
        <Cart
          cartItems={cartItems}
          totalItems={totalItems}
          removeFromCart={removeFromCart}
          confirmOrder={confirmOrder}   
        />
      </div>

      {/* Confirmation overlay/page */}
      {showConfirmation && (
        <OrderConfirmation
          cartItems={cartItems}
          totalPrice={cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)}
          onStartNewOrder={startNewOrder}
        />
      )}
    </div>
  );
}


function Productcard({ productObj, addToCart, quantityInCart }) {

  return (
    <div className="mb-15 relative">

      <div className="relative mb-4">
        <picture className="block">
          <source media="(min-width: 1024px)" srcSet={productObj.image.desktop} />
          <source media="(min-width: 768px)" srcSet={productObj.image.tablet} />
          <img
            src={productObj.image.mobile}
            alt={`${productObj.name} - delicious ${productObj.category.toLowerCase()}`}
            className="w-full h-56 object-cover md:h-64 lg:h-80 transition-transform duration-500 rounded-lg"
            loading="lazy"
            decoding="async"
            width="400"
            height="300"
          />
        </picture>

        {/* This is the important change */}
        {quantityInCart === 0 ? (
          <button
            onClick={() => addToCart(productObj, 1)}
            className="border font-semibold border-[#caafa7] bg-white px-6 py-3 m-auto flex items-center rounded-4xl -mt-5 relative z-50 hover:cursor-pointer"
          >
            <img src="./assets/images/icon-add-to-cart.svg" className="w-5 h-5 mr-3" alt="" />
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-between gap-5 bg-red-500 text-white px-6 py-3 rounded-4xl -mt-5 relative z-50 w-fit mx-auto">
            <button
              onClick={() => addToCart(productObj, -1)}
              className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center hover:bg-red-700"
            >
              <img src="./assets/images/icon-decrement-quantity.svg" alt="decrease" />
            </button>

            <span className="text-lg font-semibold min-w-[2ch] text-center">
              {quantityInCart}
            </span>

            <button
              onClick={() => addToCart(productObj, +1)}
              className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center hover:bg-red-700"
            >
              <img src="./assets/images/icon-increment-quantity.svg" alt="increase" />
            </button>
          </div>
        )}
      </div>

      <h4 className="text-lg text-[#a48e88]">{productObj.category}</h4>
      <h3 className="text-xl font-semibold">{productObj.name}</h3>
      <span className="text-red-500 text-lg font-bold">${productObj.price.toFixed(2)}</span>
    </div>
  );
}



function Cart({ cartItems, totalItems, removeFromCart, confirmOrder }) {
  const totalPrice = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="m-auto w-[90%] my-8 text-center">
        <h1 className="text-xl font-bold text-red-500 mb-4">Your Cart ({totalItems})</h1>
        <img 
          className="m-auto mb-6 w-32" 
          src="./assets/images/illustration-empty-cart.svg" 
          alt="empty cart" 
        />
        <h3 className="text-[#87635a] font-semibold">Your added items would appear here</h3>
      </div>
    );
  }

  return (
    <div className="m-auto w-[90%] my-8">
      <h1 className="text-2xl font-bold text-red-500 mb-6">Your Cart ({totalItems})</h1>

      <div className="space-y-5">
        {cartItems.map(({ product, quantity }) => (
          <div 
            key={product.name} 
            className="flex items-start justify-between border-b border-gray-200 pb-4 last:border-b-0"
          >
            <div className="flex-1">
              <h4 className="font-semibold text-gray-800">{product.name}</h4>
              <div className="mt-1 flex items-center gap-3 text-sm">
                <span className="font-medium text-red-500">{quantity}x</span>
                <span className="text-gray-500"> @ ${product.price.toFixed(2)}</span>
                <span className="font-semibold text-gray-800">
                  ${(quantity * product.price).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Remove button */}
            <button
              onClick={() => removeFromCart(product.name)}
              className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded-full hover:bg-red-50"
              title="Remove item"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M3 6h18M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2M10 11v6M14 11v6"/>
              </svg>
            </button>
          </div>
        ))}
      </div>

<div className="mt-6 flex justify-between items-center text-lg font-bold">
  <span className="text-gray-700">Order Total</span>
  <span className="text-2xl text-red-700">${totalPrice.toFixed(2)}</span>
</div>

{/* Confirm button */}
<button
  onClick={confirmOrder}  
  className="mt-6 w-full bg-red-600 text-white py-4 rounded-full font-semibold hover:bg-red-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
  disabled={cartItems.length === 0}
>
  Confirm Order
</button>
    </div>
  );
}




function OrderConfirmation({ cartItems, totalPrice, onStartNewOrder }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="bg-linear-to-b from-gray-800 to-gray-900 text-white p-6 rounded-t-2xl text-center">
          <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold">Order Confirmed</h2>
          <p className="text-gray-300 mt-2">We hope you enjoy your food!</p>
        </div>

        {/* Items list */}
        <div className="p-6 space-y-4">
          {cartItems.map(({ product, quantity }) => (
            <div key={product.name} className="flex items-center gap-4 border-b pb-4 last:border-b-0 last:pb-0">
              {/* Thumbnail – adjust path if needed */}
              <img
                src={product.image.thumbnail}
                alt={product.name}
                className="w-16 h-16 object-cover rounded-md"
              />
              <div className="flex-1">
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-sm text-gray-600">
                  {quantity}x @ ${product.price.toFixed(2)}
                </p>
              </div>
              <span className="font-bold">${(quantity * product.price).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="px-6 pb-6">
          <div className="flex justify-between text-lg font-bold">
            <span>Order Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* Button */}
        <div className="p-6 pt-0">
          <button
            onClick={onStartNewOrder}
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition"
          >
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
}


