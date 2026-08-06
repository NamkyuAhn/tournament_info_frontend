export function formatDateTimeToApi(
  value
) {

  if (!value) {
    return null;
  }


  return new Date(value)
    .toISOString();

}