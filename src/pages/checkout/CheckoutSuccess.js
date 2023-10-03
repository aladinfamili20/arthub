import { Link } from "react-router-dom";
import './CheckoutSuccess.css'
import CustomerOrder from "../Customer/CustomerOrder";
const CheckoutSuccess = () => {
  return (
    <section>
      <div className="payment-confirmation">
      <h1>Payment Confirmation</h1>
      <p>Thank you for your payment!</p>
      <div className="confirmation-details">
        <h2>Order Details</h2>
        {/* Display order details here */}
        <CustomerOrder/>
      </div>
      <div className="button-container">
        <Link to={'/'}>
        <button className="btn1">Back to Home</button>
        </Link>
        <Link to={'/order-history'}>
        <button className="btn1">View all orders</button>
        </Link>
       </div>
        
    </div>
    </section>
  );
};

export default CheckoutSuccess;
