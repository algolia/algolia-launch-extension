export function getPrice(objectData) {
  return (Number(objectData.price) - (Number(objectData.price) * Number(objectData.discount))) * Number(objectData.quantity);
}

export function getTotal(objectData) {
  return objectData.reduce(function(accum, data) {
    return accum + getPrice(data);
  }, 0);
}

export function updatePayload(payload, objectData) {
  const updatedPayload = {
    ...payload,
    objectData
  };
  const value = getTotal(objectData);
  if (value && value > 0) {
    updatedPayload.value = value;
  }
  return updatedPayload;
}
