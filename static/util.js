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
export { workInLoop, workOutLoop };
