export const formattedDate = function (d = new Date()) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return `${day}/${month}/${year}`;
};

export const formattedTime = function (today = new Date()) {
  return today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
};

export const formattedDateServer = function (d = new Date()) {
  let month = String(d.getMonth() + 1);
  let day = String(d.getDate());
  const year = String(d.getFullYear());

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) { 
    day = '0' + day;
  }

  return `${year}-${month}-${day}`;
};
