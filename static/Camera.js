class Camera {
  static constraints = {
    video: {
      width: 500,
      height: 500,
    },
    audio: true,
  };
  constructor(video) {
    if (!video || typeof video.play !== 'function') {
      throw new Error('参数必须为video标签');
    }

    this.video = video; // video标签
    this.canvas = null; // canvas标签

    this.initState(); // 初始化一些状态
  }

  // 异步开启摄像头
  asyncOpen() {
    return new Promise(resolve => {
      navigator.mediaDevices
        .getUserMedia(Camera.constraints)
        .then(MediaStream => {
          // 媒体流跟踪，用于后续关闭
          this.MediaStreamTrack =
            typeof MediaStream.stop === 'function' ? stream : stream.getTracks()[0];

          this.video.srcObject = MediaStream;
          this.video.play();

          resolve(true);
        })
        .catch(err => {
          console.log(err);
          resolve(false);
        });
    });
  }

  close() {
    this.MediaStreamTrack && this.MediaStreamTrack.stop();
  }

  // 获取base64格式的图像
  getBase64Image() {
    if (!this.canvas) {
      initCanvas();
    }

    const ctx = this.canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, Camera.constraints.width, Camera.constraints.height);
    return this.canvas.toDataURL();
  }

  // 初始化canvas
  initCanvas() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = Camera.constraints.width;
    this.canvas.height = Camera.constraints.height;
    this.canvas.style.cssText = 'display:none;';
    document.body.appendChild(this.canvas);
  }

  // 初始化状态
  initState() {
    this.initCanvas = this.initCanvas.bind(this);
    this.asyncOpen = this.asyncOpen.bind(this);
    this.close = this.close.bind(this);
    this.getBase64Image = this.getBase64Image.bind(this);
    this.initCanvas();
  }
}
export default Camera;
