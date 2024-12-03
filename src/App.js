import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './pages/CheckoutForm';

// Load Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51QRpWsE6kFAfkJCwBU91SSzbQki8cybXNe0yQczbGnrfta92JwfvDsIsAYxdVi15ksPUprrPG4XqrHIflYZUTfYy00bvBc2Ipz'); // Replace with your Stripe Publishable Key

function App() {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
}

export default App;
