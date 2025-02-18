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

// Função utilizada para na filtragem de dados por texto no Admin Dashbord.
export function normalizeString(string) {
  return string.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};

export function searchText(entity) {
  const InputLabelText = [
    'Pesquisar por nome do cliente ou nome da praia',
    'Pesquisar por nome, email ou contacto',
    'Pesquisar por nome ou descrição',
  ];

  switch (entity) {
    case ENTITIES.BEACHES:
      return InputLabelText[2];
    case ENTITIES.RESERVATIONS:
      return InputLabelText[0];
    case ENTITIES.LIFEGUARDS:
      return InputLabelText[1];
    case ENTITIES.RESERVATIONS:
      return InputLabelText[0];
    case ENTITIES.EVALUATIONS:
      return InputLabelText[0];
    case ENTITIES.CLIENTS:
      return InputLabelText[1];
  };
};