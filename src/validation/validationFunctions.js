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
    RESERVATION_COST: 'O custo da reserva é obrigatório.'
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
    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email)) {
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

export const validateLifeguardFields = (data) => {
    const errors = {
        NIF: '',
        FULL_NAME: '',
        YEAR_OF_BIRTH: '',
        EMAIL: '',
        CONTACT: ''
    };

    // NIF VALIDATION
    if(data.NIF.length < 9) {
        errors.NIF = MANDATORY_FIELDS.NIF;
    };

    if(!checkOnlyNumbers(data.NIF)) {
        errors.NIF = 'O NIF inserido é inválido, só pode conter números.'
    };


    // FULL NAME VALIDATION
    if (data.FULL_NAME.length < 5) {
        errors.NAME = 'O nome completo é necessário.';
    };

    // EMAIL VALIDATION
    setEmailError(errors, (data.EMAIL || '').trim());
    
    // CONTACT VALIDATION
    if(data.CONTACT.length < 9 ) {
        errors.CONTACT = 'O número de telemóvel é inválido (9 caracteres necessários).';
    };

    if(!checkOnlyNumbers((data.CONTACT || '').trim())) {
        errors.CONTACT = 'O número de telemóvel é inválido (Apenas números são permitidos).'
    };

    // YEAR OF BIRTH VALIDATION
    if (getAge(data.YEAR_OF_BIRTH) < 18) {
        errors.YEAR_OF_BIRTH = 'Apenas salva-vidas maiores de 18 anos podem se candidatar.';
    };
    //--

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