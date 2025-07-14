const MANDATORY_FIELDS = {
    NIF: 'O NIF inserido é inválido (9 caracteres necessários).',
    FULL_NAME: 'O nome completo é obrigatório.',
    YEAR_OF_BIRTH: 'A data de nascimento inserida é inválida.',
    EMAIL: 'O endereço de email é obrigatório.',
    PASSWORD: 'A password é obrigatória.',
    CONTACT: 'O número de telemóvel é obrigatório.',
    BEACH_NAME: 'O nome da praia é obrigatório.',
    SERVICE_TYPE: 'O tipo de serviço é obrigatório.',
    LIFEGUARD_ID: 'O preenchimento do campo de Salva-vidas é obrigatório.',
    COUNTRY_LOCATION: 'O país em que a praia pertence é obrigatória.',
    CITY_LOCATION: 'A cidade em que a praia pertence é obrigatória.',
    DESCRIPTION: 'A descrição é obrigatória.',
    PICTURE: 'A imagem é obrigatória.',
    RESERVATION_COST: 'O custo da reserva é obrigatório.',
    RESERVATION_START: 'A data de início da reserva inserida é inválida.',
    RESERVATION_END: 'A data de fim da reserva inserida é inválida.',
    CREDIT_CARD_NUMBER: 'O número de cartão de crédito é obrigatório.',
    NUMBER_OF_PEOPLE: 'O número de pessoas é obrigatório.',
    OLD_PASSWORD: 'A palavra-passe antiga é obrigatória.',
    NEW_PASSWORD: 'A nova palavra passe é obrigatória.',
    CONFIRM_PASSWORD: 'A confirmação da nova palavra-passe é obrigatória.'
};

const setMandatoryMessageErrors = (fields, data) => {
    Object.keys(fields).forEach((field) => {
        const value = data[field];
        if ((!value || (typeof value === 'string' && !value.trim()))) {
            fields[field] = MANDATORY_FIELDS[field];
        };
    });
};

export const checkOnlyNumbers = (string) => {
    return /^\d*$/.test(string);
};

const setEmailError = (errors, email) => {
    // ^ Vai dar match apenas no inicio da string.
    // [\w-\.]+@ A primeira parte da string tem de ser um caracter alfanumérico, hifen ou um ponto pelo menos 1 vez, depois disso é obrigatório existir um @.
    // ([\w-]+\.)+ Uma seccção que aceita um caractér alfanumérico, o hifen e em seguida, obrigatoriamente um ponto, essa captura tem de ocorrer pelo menos uma vez.
    // [\w-]{2,4}$ Aceita uma string alfanumérica e/ou hifen entre 2 a 4 caractéres e tem de estar no fim da string.
    // /g Fim da expressão regex com uma flag que mantém o indice do último match.
    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email || '')) {
        errors.EMAIL = 'O email inserido é inválido.';
    };
};

const getAge = (date) => {
    const CURRENT_YEAR = new Date().getFullYear();
    return CURRENT_YEAR - parseInt( ( date.slice(0, 4)));
};

export const validPositiveIntegerNumber = (number) => {
    return /^\d+$/.test(number);
}

export const validateSignUpFields = (data) => {
    const errors = {
        FULL_NAME: '',
        EMAIL: '',
        PASSWORD: ''
    };

    setEmailError(errors, (data.EMAIL || '').trim());

    if (data.PASSWORD.trim().length < 4) {
        errors.PASSWORD = 'A password tem de ter no minímo 4 caractéres.';
    };

    setMandatoryMessageErrors(errors, data)
    return errors;
};

export const validateLoginFields = (data) => {
    const errors = {
        EMAIL: '',
        PASSWORD: ''
    };
    setEmailError(errors, (data.EMAIL || '').trim());

    if (data.PASSWORD.trim().length < 4) {
        errors.PASSWORD = 'A password tem de ter no minímo 4 caractéres.';
    };

    setMandatoryMessageErrors(errors, data)
    return errors;
};

export const validateClientFields = (data) => {
    const errors = {
        FULL_NAME: '',
        YEAR_OF_BIRTH: '',
        CONTACT: ''
    };

    // FULL NAME VALIDATION
    if (data.FULL_NAME.length < 5 && data.FULL_NAME.split(' ').length < 2) {
        errors.FULL_NAME = 'O nome completo é necessário.';
    };

    // CONTACT VALIDATION
    if ((data.CONTACT || '').trim().length < 9) {
        errors.CONTACT = 'O número de telemóvel é inválido (9 caracteres necessários).';
    };

    if (!checkOnlyNumbers((data.CONTACT || '').trim())) {
        errors.CONTACT = 'O número de telemóvel é inválido (Apenas números são permitidos).'
    };

    setMandatoryMessageErrors(errors, data);
    return errors;
};

export const validateReservationCostFields = (minCost, maxCost) => {
    const errors = {
        minCostMessage: '',
        maxCostMessage: ''
    };

    if(!validPositiveIntegerNumber(minCost)) {
        errors.minCostMessage = 'Indique um valor válido.';
    };

    if (!validPositiveIntegerNumber(maxCost)) {
        errors.maxCostMessage = 'Indique um valor válido.';
    };

    if (errors.minCostMessage || errors.maxCostMessage) {
        return errors;
    };

    const MIN = Number(minCost);
    const MAX = Number(maxCost);

    if (errors.minCostMessage === '' && errors.maxCostMessage === '' && MIN > MAX) {
        errors.minCostMessage = 'Valor minímo maior que o valor máximo.';
        errors.maxCostMessage = 'Valor máximo menor que o valor minímo.'
    };
    return errors;
};

export const validateBeachFormFields = (data) => {
    const errors = {
        BEACH_NAME: '',
        SERVICE_TYPE: '',
        COUNTRY_LOCATION: '',
        CITY_LOCATION: '',
        DESCRIPTION: '',
        RESERVATION_COST: '',
        LIFEGUARD_ID: '',
        PICTURE: '',
    };

    if (!checkOnlyNumbers(data.RESERVATION_COST)) {
        errors.RESERVATION_COST = 'O custo de reserva só pode conter números.';
    };

    setMandatoryMessageErrors(errors, data);
    
    if (data.LIFEGUARD_ID !== undefined) {
        errors.LIFEGUARD_ID = '';
    };

    if (!(data.PICTURE)) {
        errors.PICTURE = MANDATORY_FIELDS.PICTURE;
    };
    return errors;
};

export const validateAdminLifeguardFields = (data) => {
    const errors = {
        Nome: '',
        Salário: '',
        Estado: '',
    };

    if (data.Nome.length < 5) {
        errors.Nome = 'O nome completo é necessário.';
    }

    if (!checkOnlyNumbers(data.Salário) && data.Salário !== '') {
        errors.Salário = 'O salário só pode conter números.';
    };

    if (!data.Estado) {
        errors.Estado = 'O estado do Salva-vidas é obrigatório.';
    };

    return errors;
};

export const validateReservationFields = (data) => {
    const errors = {
        RESERVATION_START: "",
        RESERVATION_END: "",
        CREDIT_CARD_NUMBER: "",
        NUMBER_OF_PEOPLE: "",
    };

    const startDate = new Date(data.RESERVATION_START);
    const endDate = new Date(data.RESERVATION_END);

    if (startDate > endDate) {
        errors.RESERVATION_START = 'A data de início da reserva deve ser anterior à data de fim.';
        errors.RESERVATION_END = 'A data de fim da reserva deve ser posterior à data de início.';
    };
            
    if (data.CREDIT_CARD_NUMBER.length !== 16 && data.CREDIT_CARD_NUMBER.length !== 15) {
        errors.CREDIT_CARD_NUMBER = 'O número de cartão de crédito tem de ter 16 ou 15 dígitos.';
    };

    if (!checkOnlyNumbers(data.CREDIT_CARD_NUMBER)) {
        errors.CREDIT_CARD_NUMBER = 'O número de cartão só pode conter números.';
    };

    if (!validPositiveIntegerNumber(data.NUMBER_OF_PEOPLE)) {
        errors.NUMBER_OF_PEOPLE = 'O número de pessoas só pode conter números.';
    };

    if (Number(data.NUMBER_OF_PEOPLE) > 100) {
        errors.NUMBER_OF_PEOPLE = 'O número de pessoas não pode ser superior a 100.';
    };

    setMandatoryMessageErrors(errors, data);
    return errors;
};

export const validatePasswordChangeFields = (data) => {
    const errors = {
        OLD_PASSWORD: '',
        NEW_PASSWORD: '',
        CONFIRM_PASSWORD: ''
    };
    
    if (data.NEW_PASSWORD !== data.CONFIRM_PASSWORD) {
        errors.CONFIRM_PASSWORD = 'A nova palavra-passe não coincide com a confirmação.';
    };

    setMandatoryMessageErrors(errors, data);
    return errors;
};