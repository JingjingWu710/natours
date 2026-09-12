/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const bookTour = async tourId => {
  try {
    // Initialize Stripe HERE, inside the function
    const stripe = Stripe(
      'pk_test_51UDeQNGRfgDlsy2FGtIt0kBtUsWd1Qv2KahmisDGc4kOuOnNbKprbo5A9ZlcAaj5pU5eEUVo2sNwgSV1rULxbpCt00inl95ZhM',
    );

    // 1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);
    // 2) Create checkout from + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
