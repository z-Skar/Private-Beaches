const validEmail = (email) => {
    // ^ Vai dar match apenas no inicio da string.
    // [\w-\.]+@ A primeira parte da string tem de ser um caracter alfanumérico, hifen ou um ponto pelo menos 1 vez, depois disso é obrigatório existir um @.
    // ([\w-]+\.)+ Uma seccção que aceita um caractér alfanumérico, o hifen e em seguida, obrigatoriamente um ponto, essa captura tem de ocorrer pelo menos uma vez.
    // [\w-]{2,4}$ Aceita uma string alfanumérica e/ou hifen entre 2 a 4 caractéres e tem de estar no fim da string.
    // /g Fim da expressão regex com uma flag que mantém o indice do último match.
    return !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(email);
}

export const validateSignUpFields = (data) => {
    const errors = {};

    if(!data.NAME.trim()) {
        errors.NAME = 'Nome obrigatório.';
    };

    if(!data.EMAIL.trim() && validEmail(data.EMAIL.trim())) {
        errors.EMAIL = 'Email obrigatório.';
    };


    if(!data.PASSWORD.trim()) {
        errors.PASSWORD = 'Password obrigatória.';
    };

    if(data.PASSWORD.trim()) {
        if(data.PASSWORD.trim().length < 4) {
            errors.PASSWORD = 'A password tem de ter no minímo 4 caractéres.'
        };
    };

    return errors;
};

export const validateLifeguardFields = (data) => {
    const errors = {};

    const MANDATORY_FIELDS = {
        NIF: 'O NIF é obrigatória.',
        FULL_NAME: 'O nome completo é obrigatório.',
        YEAR_OF_BIRTH: 'A data de nascimento é obrigatória.',
        EMAIL: 'O endereço de email é obrigatório.',
        CONTACT: 'O número de telemóvel é obrigatório.'
    };

    Object.keys(MANDATORY_FIELDS).map((field) => {
        if(!data[field].trim()) {
            errors[field] = MANDATORY_FIELDS[field];
        };
    });
    return errors;
};