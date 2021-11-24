export function buildPossibleStatusForOrder(order) {
  const { currentState } = order;

  switch (currentState) {
    case "PENDIENTE":
      return ["EN PREPARACION", "LISTO PARA ENTREGAR", "RECHAZADO", "CANCELAR"];
    case "EN_PREPARACION":
      return ["LISTO PARA ENTREGAR", "CANCELADO"];
    case "LISTO_PARA_ENTREGAR":
      return ["ENTREGADO", "CANCELADO"];
    default: 
      return ["EN PREPARACION", "LISTO PARA ENTREGAR", "RECHAZADO", "CANCELAR"];
  }
}
