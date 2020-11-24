class Camera {
  constructor(video) {
    if (!video || !video.play) {
      throw new Error('参数必须为video标签');
    }

    this.video = video; // video标签
    this.canvas = null; // canvas标签

    this.initState(); // 初始化一些状态
  }

  // 异步开启摄像头
  asyncOpen() {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices
        .getUserMedia(Camera.constraints)
        .then(function (MediaStream) {
          this.video.srcObject = MediaStream;
          this.video.play();

          resolve(true);
        })
        .catch(err => {
          resolve(null);
        });
    });
  }

  // 获取base64格式的图像
  getBase64Image() {
    if (!this.canvas) {
      initCanvas();
    }

    const ctx = this.canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, 500, 500);
    return this.canvas.toDataURL();
  }

  // 初始化canvas
  initCanvas() {
    this.canvas = document.createElement('canvas'); // canvas
    this.canvas.style.cssText = 'display:none;';
    document.body.appendChild(this.canvas);
  }

  // 初始化状态
  initState() {
    this.initCanvas = this.initCanvas.bind(this);
    this.asyncOpen = this.asyncOpen.bind(this);
    this.getBase64Image = this.getBase64Image.bind(this);
    this.initCanvas();
  }
}
Camera.constraints = {
  video: {
    width: 500,
    height: 500,
  },
  audio: true,
};

export default Camera;
