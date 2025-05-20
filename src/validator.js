import * as Yup from 'yup'

const schema = Yup.object().shape({
  url: Yup.string().strict(true).url(),
})

const validate = url => {
  return schema.validate(url)
}

export default validate
