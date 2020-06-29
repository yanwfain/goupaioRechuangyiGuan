const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
var toHide = function (array) {
  var phone = array.substring(0, 4) + '**********' + array.substring(14,18);
  return phone;
}

module.exports = {
  formatTime: formatTime,
  toHide: toHide
}
