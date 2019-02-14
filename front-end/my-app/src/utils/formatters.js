export const currencyFormatter = (
  value,
  locale = "pt-PT",
  currency = "EUR"
) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency
  }).format(value);
};

export const floatNumberFormatter = (value, locale = "pt-PT") => {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    minimumIntegerDigits: 1
  }).format(Number(value));
};
