import * as Yup from 'yup'

const makeSchema = existingUrls =>
  Yup.object().shape({
    url: Yup.string()
      .strict(true)
      .required('form.required')
      .url('form.invalid')
      .notOneOf(existingUrls, 'form.notUnique'),
  })

const validate = (data, existingUrls = []) => {
  const schema = makeSchema(existingUrls)
  return schema.validate(data)
}

export default validate
