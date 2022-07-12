import styles from './index.module.css'
import React, { useState, useRef } from 'react'
import useForm from './useForm'
import validateInfo from './validateInfo'
import { motion } from 'framer-motion'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const { handleSubmit, errors } = useForm(
    validateInfo,
    name,
    email,
    subject,
    message,
  )

  const animateParent = {
    hidden: {},
    visible: { transition: { delay: 2, staggerChildren: 0.7 } },
  }
  const animateChild = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'easeOut', duration: 0.5 },
    },
  }

  return (
    <motion.div
      variants={animateParent}
      initial="hidden"
      animate="visible"
      className={styles.contact}
    >
      <motion.div variants={animateChild} className={styles.contact_heading}>
        I'll love to hear your suggestions
      </motion.div>
      <motion.form
        onSubmit={handleSubmit}
        variants={animateChild}
        className={styles.container}
      >
        <div className={styles.input_container}>
          <div className={styles.input_form_text_container}>
            <label for="name" className={styles.input_form_text}>
              What's your name?
            </label>
            {errors.name && (
              <span className={styles.input_form_invalid_text}>
                {errors.name}
              </span>
            )}
          </div>
          <input
            id="name"
            name="from_name"
            onChange={(e) => {
              setName(e.target.value)
            }}
            value={name}
          ></input>
        </div>

        <div className={styles.input_container}>
          <div className={styles.input_form_text_container}>
            <label for="email" className={styles.input_form_text}>
              What's your email?
            </label>
            {errors.email && (
              <span className={styles.input_form_invalid_text}>
                {errors.email}
              </span>
            )}
          </div>
          <input
            id="email"
            name="from_email"
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            value={email}
          ></input>
        </div>

        <div className={styles.input_container}>
          <div className={styles.input_form_text_container}>
            <label for="subject" className={styles.input_form_text}>
              What's the subject?
            </label>
            {errors.subject && (
              <span className={styles.input_form_invalid_text}>
                {errors.subject}
              </span>
            )}
          </div>
          <input
            id="subject"
            name="subject"
            onChange={(e) => {
              setSubject(e.target.value)
            }}
            value={subject}
          ></input>
        </div>

        <div className={styles.input_container}>
          <div className={styles.input_form_text_container}>
            <label for="message" className={styles.input_form_text}>
              What's the message?
            </label>
            {errors.message && (
              <span className={styles.input_form_invalid_text}>
                {errors.message}
              </span>
            )}
          </div>
          <input
            id="message"
            name="message"
            onChange={(e) => {
              setMessage(e.target.value)
            }}
          ></input>
        </div>

        <button
          type="submit"
          className={styles.contact_send}
          onClick={(e) => {
            handleSubmit(e)
          }}
        >
          Send
        </button>
      </motion.form>
    </motion.div>
  )
}

export default Contact
