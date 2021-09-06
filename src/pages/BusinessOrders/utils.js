export function buildPossibleStatusForOrder(order) {
  const { currentState } = order;

  switch (currentState) {
    case "PENDIENTE":
      return ["EN PREPARACION", "RECHAZADO", "CANCELAR"];
    case "EN_PREPARACION":
      return ["LISTO_PARA_ENTREGAR", "CANCELADO"];
    case "LISTO_PARA_ENTREGAR":
      return ["ENTREGADO", "CANCELADO"];
    default: 
      return ["EN PREPARACION", "RECHAZADO", "CANCELAR"];
  }
}