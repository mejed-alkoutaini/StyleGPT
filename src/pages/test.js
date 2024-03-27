import axios from "axios";

const test = () => {
  const getACustomer = async () => {
    const customer = await axios("/api/getACustomer");
    console.log("Client", customer);
  };
  return (
    <div>
      <button onClick={getACustomer}>Get a Customer</button>
    </div>
  );
};

export default test;

// 7777d87904299abf32692aced37e3fd0c05a5733a37a5b2d0d

// Client: test_68584243eb99fae5175fd69391e
