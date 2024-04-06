const formatTime = seconds => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

const startTimeWorkedInterval = (store) => {
  clearInterval(store.interval);
  store.interval = setInterval(() => store.timeWorked++, 1000);
 };
 
 const stopTimeWorkedInterval = (store) => {
  clearInterval(store.interval);
 };

export {
  formatTime,
  startTimeWorkedInterval,
  stopTimeWorkedInterval
}