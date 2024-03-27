export default async function handler(req, res) {
  try {
    const response = await fetch("https://api.paddle.com/customers", {
      method: "POST",
      headers: {
        Authorization: "Bearer ef546994a82f0fea1a5e65f642bb20fd22ac1276c8be877830",
        "Content-Type": "application/json", // Specify content type
      },
      body: JSON.stringify({
        name: "test000",
        email: "test000@example.com",
      }),
    });

    // Parse response as JSON
    const customer = await response.json();

    console.log("api/customer", customer);

    res.status(200).json({ message: "success", data: customer });
  } catch (error) {
    console.log("error", error);
    res.status(400).json({ error: error.message });
  }
}
