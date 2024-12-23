const validEmail = (email) => {
    // ^ Vai dar match apenas no inicio da string.
    // [\w-\.]+@ A primeira parte da string tem de ser um caracter alfanumérico, hifen ou um ponto pelo menos 1 vez, depois disso é obrigatório existir um @.
    // ([\w-]+\.)+ Uma seccção que aceita um caractér alfanumérico, o hifen e em seguida, obrigatoriamente um ponto, essa captura tem de ocorrer pelo menos uma vez.
    // [\w-]{2,4}$ Aceita uma string alfanumérica e/ou hifen entre 2 a 4 caractéres e tem de estar no fim da string.
    // /g Fim da expressão regex com uma flag que mantém o indice do último match.
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
};

const getAge = (date) => {
    const CURRENT_YEAR = new Date().getFullYear();
    return CURRENT_YEAR - parseInt( ( date.slice(0, 4)));
};

export const validateSignUpFields = (data) => {
    const errors = {};

    if (!data.NAME.trim()) {
        errors.NAME = 'O nome completo é obrigatório.';
    };

    if (!data.EMAIL.trim()) {
        errors.EMAIL = 'O email é obrigatório.';
    };

    if (!errors.EMAIL && validEmail(data.EMAIL.trim())) {
        errors.EMAIL = 'Email inválido.'
    };

    if (!data.PASSWORD.trim()) {
        errors.PASSWORD = 'A password é obrigatória.';
    } else if (data.PASSWORD.trim().length < 4) {
        errors.PASSWORD = 'A password tem de ter no minímo 4 caractéres.';
    };
    return errors;
};

export const validateLifeguardFields = (data) => {
    const errors = {};

    const MANDATORY_FIELDS = {
        NIF: 'O NIF é obrigatório.',
        FULL_NAME: 'O nome completo é obrigatório.',
        YEAR_OF_BIRTH: 'A data de nascimento inserida é inválida.',
        EMAIL: 'O endereço de email é obrigatório.',
        CONTACT: 'O número de telemóvel é obrigatório.'
    };

    if (data.FULL_NAME.length < 5) {
        errors.NAME = 'O nome completo é necessário.';
    };
    
    if (getAge(data.YEAR_OF_BIRTH) <= 18) {
        errors.YEAR_OF_BIRTH = 'Apenas salva-vidas maiores de 18 anos podem se candidatar.';
    };

    if (!validEmail(data.EMAIL)) {
        errors.EMAIL = 'Email inválido.';
    };

    Object.keys(MANDATORY_FIELDS).forEach((field) => {
        if(!(data[field]).trim()) {
            errors[field] = MANDATORY_FIELDS[field];
        };
    });
    return errors;
};