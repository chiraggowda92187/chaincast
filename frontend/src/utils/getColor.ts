export function getColor(type: string) {
  let color = '';
  switch (type) {
    case 'TOKEN_TRANSFER':
      color = '#1373F7';
      break;
    case 'PAYMENT':
      color = '#25B671';
      break;
    case 'ESCROW':
      color = '#E3A036';
      break;
    case 'STAKE':
      color = '#E3322C';
      break;
    case 'NFT':
      color = '#7553FD';
      break;
    case 'AIRDROP':
      color = '#845BFF';
      break;
    default:
      break;
  }
  return color;
}
