const MANDATORY_FIELDS = {
    NIF: 'O NIF inserido é inválido (9 caracteres necessários).',
    FULL_NAME: 'O nome completo é obrigatório.',
    YEAR_OF_BIRTH: 'A data de nascimento inserida é inválida.',
    EMAIL: 'O endereço de email é obrigatório.',
    PASSWORD: 'A password é obrigatória.',
    CONTACT: 'O número de telemóvel é obrigatório.',
    BEACH_NAME: 'O nome da praia é obrigatório.',
    SERVICE_TYPE: 'O tipo de serviço é obrigatório.',
    COUNTRY_LOCATION: 'O país em que a praia pertence é obrigatória.',
    CITY_LOCATION: 'A cidade em que a praia pertence é obrigatória.',
    DESCRIPTION: 'A descrição é obrigatória.',
    PICTURE: 'A imagem é obrigatória.'
};

const setMandatoryMessageErrors = (fields, data) => {
    Object.keys(fields).forEach((field) => {
        if(!(data[field] || '').trim()) {
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
    if(data.CONTACT.length < 9) {
        errors.CONTACT = 'O número de telemóvel é inválido (9 caracteres necessários).';
    };
    if(!checkOnlyNumbers((data.CONTACT || '').trim()))


    // YEAR OF BIRTH VALIDATION 
    if (getAge(data.YEAR_OF_BIRTH) <= 18) {
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

    if (!data.BEACH_NAME.trim()) {
        errors.BEACH_NAME = MANDATORY_FIELDS.BEACH_NAME || 'O nome da praia é obrigatório.';
    }

    if (!data.SERVICE_TYPE.trim()) {
        errors.SERVICE_TYPE = MANDATORY_FIELDS.SERVICE_TYPE || 'O tipo de serviço é obrigatório.';
    }

    if (!data.COUNTRY_LOCATION.trim()) {
        errors.COUNTRY_LOCATION = MANDATORY_FIELDS.COUNTRY_LOCATION || 'A localização do país é obrigatória.';
    }

    if (!data.CITY_LOCATION.trim()) {
        errors.CITY_LOCATION = MANDATORY_FIELDS.CITY_LOCATION || 'A localização da cidade é obrigatória.';
    }

    if (!data.DESCRIPTION.trim()) {
        errors.DESCRIPTION = MANDATORY_FIELDS.DESCRIPTION || 'A descrição é obrigatória.';
    }

    if (!data.RESERVATION_COST.trim() || !checkOnlyNumbers(data.RESERVATION_COST)) {
        errors.RESERVATION_COST = 'O custo da reserva é obrigatório e deve conter apenas números.';
    }

    if (data.LIFEGUARD_ID !== null && !data.LIFEGUARD_ID.trim()) {
        errors.LIFEGUARD_ID = 'O ID do salva-vidas é obrigatório.';
    }

    if (!data.PICTURE) {
        errors.PICTURE = MANDATORY_FIELDS.PICTURE;
    };

    setMandatoryMessageErrors(errors, data);
    return errors;
};