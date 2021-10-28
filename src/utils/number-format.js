const CurrencyFormatMXN = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
});

export function CurrencyFormat(number) {
  return CurrencyFormatMXN.format(number);
}
