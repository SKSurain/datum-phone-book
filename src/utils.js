export const validatePhoneNumber = (phoneNumber) => {
    const pattern = /^[0-9]+$/; // Simple digit-only pattern
    return pattern.test(phoneNumber);
};

export const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
};
