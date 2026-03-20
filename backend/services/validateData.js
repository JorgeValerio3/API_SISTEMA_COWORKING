const validateData = {
    validateEmail: (value) => {
        return (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
            ? true
            : false;
    },
    validatePass: (value) => {
        return (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/.test(value))
            ? true
            : false;
    },
    validateName: (value) => {
        return (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/.test(value))
            ? true
            : false;
    },
    validateNumber: (value) => {
        return (!/^\d+$/.test(String(value)))
            ? true
            : false;
    },
    validateDate: (value) => {
        return (!/^\d{4}-\d{2}-\d{2}$/.test(value))
            ? true
            : false;
    },
    validateTime: (value) => {
        return (!/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(value))
            ? true
            : false;
    }
};
export default validateData;
//# sourceMappingURL=validateData.js.map