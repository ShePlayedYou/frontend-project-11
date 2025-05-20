import * as Yup from 'yup'

Yup.setLocale({
  mixed: {
    required: () => ({ key: 'form.required' }),
  },
  string: {
    url: () => ({ key: 'form.invalid' }),
  },
})
