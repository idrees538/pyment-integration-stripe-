import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [paymentProcessing, setPaymentProcessing] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setPaymentProcessing(true);

        const { error: backendError, clientSecret } = await fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: 1000 }),
        }).then((res) => res.json());

        if (backendError) {
            setError(backendError);
            setPaymentProcessing(false);
            return;
        }

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
            },
        });

        if (stripeError) {
            setError(stripeError.message);
            setPaymentProcessing(false);
        } else if (paymentIntent) {
            setSuccess(true);
            setError(null);
            setPaymentProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 shadow-md mt-6 rounded-md">
            <CardElement className="p-3 border-2 border-gray-300 rounded-md" />
            <button type="submit" disabled={!stripe || paymentProcessing} className="mt-4 w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none">
                {paymentProcessing ? 'Processing...' : 'Pay'}
            </button>
            {error && <div className="mt-3 text-red-500">{error}</div>}
            {success && <div className="mt-3 text-green-500">Payment Successful!</div>}
        </form>
    );
};

export default CheckoutForm;
