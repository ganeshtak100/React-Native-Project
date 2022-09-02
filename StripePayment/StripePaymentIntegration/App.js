//import liraries
import {StripeProvider} from '@stripe/stripe-react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {PaymentScreen} from './src/screens/PaymentScreen';

// create a component
const App = () => {
  return (
    <StripeProvider
      publishableKey="pk_test_51LSdmTSEVhaEemV9F3Z5IrAST0NYGBuKfoxLQulPRSIcqo2eCIjtKX9yE0sTR5bwetMrUxjfBtF4nFyJNZ1TvNui00RzK8JM5z"
      // urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      // merchantIdentifier="merchant.com.{{SweetShop}}" // required for Apple Pay
    >
      <PaymentScreen />
    </StripeProvider>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

//make this component available to the app
export default App;
