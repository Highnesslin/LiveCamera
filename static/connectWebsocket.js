const connectWebsocket = () => {
  return new Promise(resolve => {
    const ws = new WebSocket('ws://localhost:8888');
    ws.onopen = function () {
      resolve(ws);
    };
  });
};

export default connectWebsocket;
