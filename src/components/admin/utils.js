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
    }
  };

  export function getColumns( entity ) {
    switch (entity) {
      case 'beaches':
        return [
          { title: 'Praia-ID', field: 'BEACH_ID' },
          { title: 'Nome', field: 'BEACH_NAME' },
          { title: 'Descrição', field: 'DESCRIPTION' },
          { title: 'Cidade', field: 'CITY_LOCATION' },
          { title: 'País', field: 'COUNTRY_LOCATION' },
          { title: 'Custo de Reserva', field: 'RESERVATION_COST' },
          { title: 'Salva-vidas', field: 'FULL_NAME' },
          { title: 'Serviço', field: 'SERVICE_TYPE' },
          { title: 'Avaliação (Média)', field: 'SCORE' },
        ];
      case 'lifeguards':
        return [
          { title: 'Salva-vidas-ID', field: 'LIFEGUARD_ID' },
          { title: 'NIF', field: 'LIFEGUARD_NIF'},
          { title: 'Nome', field: 'FULL_NAME' },
          { title: 'Data de nascimento', field: 'YEAR_OF_BIRTH' },
          { title: 'Email', field: 'EMAIL' },
          { title: 'Contacto', field: 'CONTACT' },
          { title: 'Salário', field: 'SALARY' },
          { title: 'Estado', field: 'STATE'}
        ];
      case 'bills':
        return [
          { title: 'Pagamento-ID', field: 'BILL_ID' },
          { title: 'Reserva-ID', field: 'RESERVATION_ID' },
          { title: 'Número de Cartão de Crédito', field: 'CREDIT_CARD_NUMBER'},
          { title: 'Pagamento Total', field: 'BILL_COST' },
        ];
      case 'evaluations':
        return [
          { title: 'Avaliação-ID', field: 'EVALUATION_ID' },
          { title: 'Cliente', field: 'FULL_NAME' },
          { title: 'Praia', field: 'BEACH_ID' },
          { title: 'Avaliação', field: 'SCORE' },
        ];
      case 'clients':
        return [
          { title: 'Utilizador-ID', field: 'CLIENT_ID' },
          { title: 'Nome', field: 'FULL_NAME' },
          { title: 'Email', field: 'EMAIL' },
          { title: 'Data de nascimento', field: 'YEAR_OF_BIRTH' },
          { title: 'Contacto', field: 'CONTACT' },
        ];
      case 'reservations':
        return [
          { title: 'Reserva-ID', field: 'RESERVATION_ID' },
          { title: 'Cliente', field: 'CLIENT_ID' },
          { title: 'Praia', field: 'BEACH_ID' },
          { title: 'Data de início', field: 'RESERVATION_START' },
          { title: 'Data de fim', field: 'RESERVATION_END' },
        ];
    };
  };
  