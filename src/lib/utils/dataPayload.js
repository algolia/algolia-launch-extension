function getPrice(item) {
  const price = (Number(item.price) - ((item.discount) ? (Number(item.price) * Number(item.discount)) : 0)) * Number(item.quantity);
  return Math.round(price * 100) / 100;
}

function getTotal(objectData) {
  if (objectData && objectData.length > 0) {
    return objectData.reduce(function(accum, item) {
      return accum + getPrice(item);
    }, 0);
  }
  return 0;
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
