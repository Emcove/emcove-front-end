export function buildPossibleStatusForOrder(order) {
  const { status } = order;

  switch(status[status.length - 1].name) {
    case "Pendiente":
      return ["Aprobado", "Rechazado"];
    case "Aprobado":
      return ["Finalizado", "Cancelado"];
    default: 
      return ["Aprobado", "Rechazado"];
  }
}