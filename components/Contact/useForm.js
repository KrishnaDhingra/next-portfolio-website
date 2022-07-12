import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'

const useForm = (validate, name, email, subject, message) => {
  const [errors, setErrors] = useState({})
  const [firstTime, setFirstTime] = useState(true)
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    subject: '',
    message: '',
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    let values = {
      name: name,
      email: email,
      subject: subject,
      message: message,
    }
    setFormData({
      from_name: name,
      from_email: email,
      subject: subject,
      message: message,
    })
    setErrors(validate(values))
    setFirstTime(false)
  }

  const sendEmail = () => {
    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID,
      )
      .then(
        (result) => {
          toast.success('Email sent successfully')
        },
        (error) => {
          toast.error('Something went wrong')
        },
      )
  }

  useEffect(() => {
    if (Object.keys(errors).length === 0 && !firstTime) {
      console.log('Everything is good')
      sendEmail()
    }
  }, [errors])

  return { handleSubmit, errors }
}

export default useForm
