import {
  CardField,
  useConfirmPayment,
  useStripe,
} from '@stripe/stripe-react-native';
import React, {useState} from 'react';
import {Alert, Button, TextInput, View} from 'react-native';
const axios = require('axios').default;
export function PaymentScreen() {
  const [amount, setAmount] = useState(100);
  const API_URL = 'http://localhost:8080/stripe';
  let [card, setCard] = useState(null);
  const [key, setKey] = useState('');
  const {confirmPayment, loading} = useConfirmPayment();
  const fetchPaymentIntentClientSecret = async () => {
    const {confirmPayment} = useStripe();
    const response = await fetch(`${API_URL}/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currency: 'usd',
      }),
    });
    const {clientSecret} = await response.json();
    return clientSecret;
  };

  // useEffect(() => {
  //   fetch(API_URL, {
  //     method: 'POST',
  //  headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       amount: 999,
  //       id: 'pm_1HBjughjkghjy6787868989Wt',
  //       email: 'sdd@gmail.com',
  //       name: 'Ganesh',
  //     }),
  //   })
  //     .then(res => console.log('res===', res))
  //     .then(res => {
  //       const intent = res;
  //       Alert.alert(intent?.clientSecret);
  //       console.log('Intent clientsecrent key==', intent);
  //       setKey(intent?.clientSecret);
  //     })
  //     .catch(err => console.log('errr====', err));
  // }, []);

  const handlePayPress = async () => {
    // const f = await presentPaymentSheet({key});
    // console.log('first,f', f);
    if (!card) {
      Alert.alert('enter card details');
      return;
    }
    // const {id} = paymentMethod;
    await axios
      .post('http://192.168.1.81:8080/stripe', {
        amount: amount,
        id: 'pm_1HBjughjkghjy6787868989Wt',
        email: 'sdd@gmail.com',
        name: 'Ganesh',
      })
      .then(res => {
        // Alert.alert(res);
        console.log('res---', res?.data?.clientSecret);
        setKey(res?.data?.clientSecret);
      })
      .catch(error => {
        console.log('axios error', error);
      });
    if (key) {
      // To create a PaymentIntent for confirmation, see our guide at: https://stripe.com/docs/payments/payment-intents/creating-payment-intents#creating-for-automatic
      // const paymentIntents = await stripe.paymentIntents.confirm(key, {
      //   payment_method: 'pm_card_visa',
      //   billingDetails: {
      //     email: 'joe90@doe.com',
      //   },
      // });

      const {error, paymentIntent} = await confirmPayment(key, {
        paymentMethodType: 'Card',
        // paymentMethodType: 'Card',
        // payment_method: 'pm_card_visa',
        billingDetails: {
          email: 'joe90@doe.com',
        },
      });
      if (error) {
        console.log('error --', error);
        Alert.alert('Payment confirmation error', error.message);
      } else if (paymentIntent && paymentIntent?.status == 'Succeeded') {
        console.log('payment confrime message --', paymentIntent);
        Alert.alert('Payment Successful');
      }
    }

    // console.log('response:=', respo);

    // Gather the customer's billing information (for example, email)
    // const billingDetails = {
    //   email: 'jenny.rosen@example.com',
    // };

    // // Fetch the intent client secret from the backend
    // const clientSecret = await fetchPaymentIntentClientSecret();

    // // Confirm the payment with the card details
    // const {paymentIntent, error} = await confirmPayment(clientSecret, {
    //   type: 'Card',
    //   billingDetails,
    // });

    // if (error) {
    //   console.log('Payment confirmation error', error);
    // } else if (paymentIntent) {
    //   console.log('Success from promise', paymentIntent);
    // }
  };

  return (
    <View>
      <TextInput
        style={{
          marginVertical: 20,
          borderWidth: 1,
          width: 400,
          alignSelf: 'center',
          borderRadius: 10,
          height: 50,
        }}
        value={amount}
        keyboardType="numeric"
        placeholder="Enter your amount"
        onChangeText={amount => setAmount(amount)}
      />
      <CardField
        postalCodeEnabled={true}
        placeholder={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          setCard(cardDetails);
          console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
}
