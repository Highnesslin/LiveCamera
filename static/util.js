// 定时任务
const control = {
  timeout: null,
};
function workInLoop(cb, timestamp) {
  cb && cb();
  control.timeout = setTimeout(() => {
    workOutLoop(); // 清除任务
    workInLoop(cb, timestamp);
  }, timestamp);
}
function workOutLoop() {
  clearTimeout(control.timeout);
}

// 帧渲染任务
const frameCotrol = {
  current: null,
};
function workInFrame(cb) {
  cb && cb();
  frameCotrol.current = requestAnimationFrame(() => workInFrame(cb));
}
function cancelFrameWork() {
  cancelAnimationFrame(frameCotrol.current);
}

export { workInLoop, workOutLoop, workInFrame, cancelFrameWork };
