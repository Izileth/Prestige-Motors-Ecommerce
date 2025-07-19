export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);
};


export const formatDateForAPI = (dateInput: string): string => {
  const dateObj = new Date(dateInput);
  
  if (isNaN(dateObj.getTime())) {
    throw new Error("Data inválida");
  }
  
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const day = String(dateObj.getDate()).padStart(2, "0");
  
  return `${year}-${month}-${day}`;
};
