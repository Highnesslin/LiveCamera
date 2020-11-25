# web 平台 开启摄像头 + websocket 图像推送

## 开启摄像头

```
  asyncOpen() {
    return new Promise(resolve => {
      navigator.mediaDevices
        .getUserMedia(Camera.constraints)
        .then(MediaStream => {
          // 媒体流跟踪，用于后续关闭
          this.MediaStreamTrack =
            typeof stream.stop === 'function' ? stream : stream.getTracks()[0];

          this.video.srcObject = MediaStream;
          this.video.play();

          resolve(true);
        })
        .catch(err => {
          resolve(false);
        });
    });
  }

  close() {
    this.MediaStreamTrack && this.MediaStreamTrack.stop();
  }
```

## 获取 base64 格式的数据

```
getBase64Image() {
  if (!this.canvas) {
    initCanvas();
  }
  const ctx = this.canvas.getContext('2d');
  ctx.drawImage(video, 0, 0, Camera.constraints.width, Camera.constraints.height);
  return this.canvas.toDataURL();
}

initCanvas() {
  this.canvas = document.createElement('canvas');
  this.canvas.width = Camera.constraints.width;
  this.canvas.height = Camera.constraints.height;
  this.canvas.style.cssText = 'display:none;';
  document.body.appendChild(this.canvas);
}
```

## 需要注意的地方

1. websocket 可能会中断，注意重连问题
2. 开启定时任务推送 websocket 时，如果 ws 发生重连，且刚好处于 CONNECTING 或 CLOSING 状态，这时候发送任务会处于等待状态，因此会不断地堆积在 js 栈，很容易造成内存泄漏，所以要注意定时任务的处理（这里的处理方式是清除栈中的上一个任务，再开启一个新任务，代码在 utils.js）
3. [ctx.drawImage](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage) 注意参数，动态从 canvas 中获取，不然会出现图像不全的情况
