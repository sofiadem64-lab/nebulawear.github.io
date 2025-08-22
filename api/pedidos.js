export default async function handler(req, res) {
  if (req.method === "POST") {
    const { nombre, telefono, carrito } = req.body;

    // ✅ Aquí va tu número de WhatsApp con prefijo de país
    const miWhatsApp = "584121234567"; // Ejemplo Venezuela (+58)

    // ✅ Construir el mensaje
    const mensaje = `
📦 Nuevo pedido recibido
👤 Cliente: ${nombre}
📱 Teléfono: ${telefono}
🛒 Carrito: ${JSON.stringify(carrito, null, 2)}
    `;

    // ✅ Llamada al API de WhatsApp Business (Twilio como ejemplo)
    try {
      const response = await fetch("https://api.twilio.com/2010-04-01/Accounts/YOUR_ACCOUNT_SID/Messages.json", {
        method: "POST",
        headers: {
          Authorization: "Basic " + Buffer.from("YOUR_ACCOUNT_SID:YOUR_AUTH_TOKEN").toString("base64"),
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          To: `whatsapp:+${miWhatsApp}`,
          From: "whatsapp:+14155238886", // Número de WhatsApp de Twilio
          Body: mensaje,
        }),
      });

      if (!response.ok) {
        throw new Error("Error enviando el mensaje de WhatsApp");
      }

      return res.status(200).json({ success: true, message: "Pedido enviado a WhatsApp" });
    } catch (error) {
      return res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

