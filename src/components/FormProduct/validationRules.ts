export const validationRules = {
  name: {
    required: "Поле обязательно для заполнения",
    minLength: {
      value: 5,
      message: "Минимум 5 символов",
    },
    maxLength: {
      value: 30,
      message: "Максимум 30 символов",
    },
  },
  price: {
    required: "Поле обязательно для заполнения",
    min: {
      value: 10,
      message: "Минимальная цена 10",
    },
    max: {
      value: 100000,
      message: "Максимальная цена 100000",
    },
  },
  weight: {
    required: "Поле обязательно для заполнения",
    min: {
      value: 50,
      message: "Минимальный вес 50",
    },
    max: {
      value: 100000,
      message: "Максимальный вес 100000",
    },
  },
  country_manufacture: {
    required: "Поле обязательно для заполнения",
    minLength: {
      value: 2,
      message: "Минимум 2 символа",
    },
    maxLength: {
      value: 25,
      message: "Максимум 25 символов",
    },
  },
  time: {
    required: "Поле обязательно для заполнения",
    minLength: {
      value: 6,
      message: "Минимум 6 символов",
    },
    maxLength: {
      value: 15,
      message: "Максимум 15 символов",
    },
  },
  descriptions: {
    required: "Поле обязательно для заполнения",
    minLength: {
      value: 80,
      message: "Минимум 80 символов",
    },
    maxLength: {
      value: 400,
      message: "Максимум 400 символов",
    },
  },
};
