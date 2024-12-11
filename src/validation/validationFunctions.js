export const validateFields = (data) => {
    const errors = {};

    if(!data.NAME.trim()) {
        errors.NAME = 'Nome obrigatório.';
    };

    if(!data.EMAIL.trim()) {
        errors.EMAIL = 'Email obrigatório.';
    };

    if(!data.PASSWORD.trim()) {
        errors.PASSWORD = 'Password obrigatória.';
    };

    return errors;
}