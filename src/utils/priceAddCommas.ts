export function priceAddCommas(price: number, attr: string = '') {
  if (!price) return '';
  return attr + String(price).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
