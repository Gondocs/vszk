export const validatePassword = (password, passwordConfirmation) => {
    const passwordErrors = [];
    const passwordValidationRules = [
      {
        test: (password) => password.length >= 6,
        error: "Jelszó túl rövid (legalább 6 karakter szükséges)",
      },
      {
        test: (password) => /\d/.test(password),
        error: "Nincsenek számok a jelszóban",
      },
      {
        test: (password) => /[A-Z]/.test(password),
        error: "Nincsenek nagybetűk a jelszóban",
      },
      {
        test: (password) => password === passwordConfirmation,
        error: "A jelszavak nem egyeznek",
      },
      {
        test: (password) => password.length <= 24,
        error: "Jelszó túl hosszú (max 24 karakter)",
      },
      
    ];

    passwordValidationRules.forEach((rule) => {
      if (!rule.test(password)) {
        passwordErrors.push(rule.error);
      }
    });

    return passwordErrors;
  };