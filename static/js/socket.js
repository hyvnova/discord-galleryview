const wss = new Server({ port: 9990 });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
    // Handle the message from the client here if needed

    // Echo the message back to the client
    ws.send(`Server received: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log(`Server listening in ip:port ${wss.address().address}:${wss.address().port}`);
 