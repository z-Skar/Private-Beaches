const ENTITIES = {
  BEACHES: 'beaches',
  RESERVATIONS: 'reservations',
  LIFEGUARDS: 'lifeguards',
  BILLS: 'bills',
  EVALUATIONS: 'evaluations',
  CLIENTS: 'clients'
}
  
export function openSidebar() {
  if (typeof window !== "undefined") {
    document.body.style.overflow = "hidden"
    document.documentElement.style.setProperty("--SideNavigation-slideIn", "1")
  }
}

export function closeSidebar() {
  if (typeof window !== "undefined") {
    document.documentElement.style.removeProperty("--SideNavigation-slideIn")
    document.body.style.removeProperty("overflow")
  }
}

export function toggleSidebar() {
  if (typeof window !== "undefined" && typeof document !== "undefined") {
    const slideIn = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("--SideNavigation-slideIn")
    if (slideIn) {
      closeSidebar()
    } else {
      openSidebar()
    }
  }
}

export function entitiesAndNames() {
  return {
    beaches: 'Praias',
    lifeguards: 'Salva-vidas',
    bills: 'Pagamentos',
    evaluations: 'Avaliações',
    clients: 'Clientes',
    reservations: 'Reservas'
  };
};