function getPrice(item) {
  const price = (Number(item.price) - (Number(item.price) * Number(item.discount))) * Number(item.quantity);
  return Math.round(price * 100) / 100;
}

function getTotal(objectData) {
  return objectData.reduce(function(accum, item) {
    return accum + getPrice(item);
  }, 0);
}

function updatePayload(payload) {
  const updatedPayload = {
    ...payload
  };
  const value = getTotal(updatedPayload.objectData);
  if (value && value > 0) {
    updatedPayload.value = value;
  }
  return updatedPayload;
}

module.exports.getTotal = getTotal;
module.exports.updatePayload = updatePayload;
