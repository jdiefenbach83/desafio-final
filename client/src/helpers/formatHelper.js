const formatterNumber = Intl.NumberFormat('pt-BR', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});
const formatterCurrency = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function formatNumber(value) {
  return formatterNumber.format(value);
}

function formatCurrency(value) {
  return formatterCurrency.format(value);
}

export default { formatNumber, formatCurrency };
