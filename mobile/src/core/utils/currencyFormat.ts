export const getCurrencyFormat = (sum: number) => sum.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")
