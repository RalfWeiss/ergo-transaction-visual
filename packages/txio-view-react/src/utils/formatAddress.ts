export function formatAddress(addressString) {
  if (addressString.length > 12) {
    return `${addressString.slice(0, 5)}...${addressString.slice(-5)}`;
  }
  return addressString;
}
