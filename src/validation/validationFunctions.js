export const validateFields = (data) => {
    const errors = {};

    if(!data.NAME.trim()) {
        errors.NAME = 'Nome obrigatório.';
    };

    if(!data.EMAIL.trim()) {
        errors.EMAIL = 'Email obrigatório.';
    };

    // ^ Vai dar match apenas no inicio da string.
    // [\w-\.]+@ A primeira parte da string tem de ser um caracter alfanumérico, hifen ou um ponto pelo menos 1 vez, depois disso é obrigatório existir um @.
    // ([\w-]+\.)+ Uma seccção que aceita um caractér alfanumérico, o hifen e em seguida, obrigatoriamente um ponto, essa captura tem de ocorrer pelo menos uma vez.
    // [\w-]{2,4}$ Aceita uma string alfanumérica e/ou hifen entre 2 a 4 caractéres e tem de estar no fim da string.
    // /g Fim da expressão regex com uma flag que mantém o indice do último match.
    
    if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(data.EMAIL)) {
        if (!errors.EMAIL) {
            errors.EMAIL = 'Email inválido.';
        };
    };

    if(!data.PASSWORD.trim()) {
        errors.PASSWORD = 'Password obrigatória.';
    };

    return errors;
}