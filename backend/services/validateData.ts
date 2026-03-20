const validateData = {
    validateEmail: (value: string): boolean => {
        return (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value))
            ?true
            :false;
    },
    validatePass: (value: string): boolean => {
        return (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/.test(value))
            ?true
            :false;
    },
    validateName: (value: string): boolean => {
        return (!/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,50}$/.test(value))
            ?true
            :false;
    },
    validateNumber: (value: string | number): boolean => {
        return (!/^\d+$/.test(String(value)))
            ?true
            :false;
    },
    validateDate: (value: string): boolean => {
        return (!/^\d{4}-\d{2}-\d{2}$/.test(value))
            ?true
            :false;
    },
    validateTime: (value: string): boolean => {
        return (!/^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(value))
            ?true
            :false;
    }
}

export default validateData;