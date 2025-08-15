export function updatePayload(payload, objectData) {
  const updatedPayload = {
    ...payload,
    objectData
  };
  const value = objectData.reduce(function(accum, data) {
    return accum + Number(data.price) * Number(data.quantity);
  }, 0);
  if (value) {
    updatedPayload.value = value;
  }
  return updatedPayload;
}
