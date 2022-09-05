import React, { useState, useCallback } from 'react'
import Image from 'next/image'
import axios from 'axios'

const ContactUs: React.FC = () => {
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    info: { error: false, msg: null }
  })
  const [inputs, setInputs] = useState({
    companyName: "",
    email: "",
    message: ""
  })

  const handleServerResponse = useCallback((ok: boolean, msg: any): void => {
    if (ok) {
      setStatus({
        submitted: true,
        submitting: false,
        info: { error: false, msg }
      })
      setInputs({
        companyName: "",
        email: "",
        message: ""
      })
    } else {
      setStatus({
        submitted: false,
        submitting: false,
        info: { error: true, msg }
      })
    }
  }, [])

  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    e.persist()
    setInputs((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }))
    setStatus({
      submitted: false,
      submitting: false,
      info: { error: false, msg: null }
    })
  }, [])

  const handleOnSubmit = useCallback((e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    setStatus((prevStatus) => ({
      ...prevStatus,
      submitting: true
    }))
    axios({
      method: 'POST',
      url: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT_URL,
      data: inputs
    }).then((response) => {
      handleServerResponse(
        true,
        'Thank you, your message has been submitted.'
      )
    }).catch((error) => {
      handleServerResponse(
        false,
        error.response.data.error
      )
    })
  }, [inputs, handleServerResponse])

  return (
    <div className="bg-black text-white flex flex-col justify-center items-center min-h-screen pt-10">
      <div>
        <Image src="/assets/logo.svg" alt="logo" width={25} height={25} />
      </div>
      <h2 className="text-3xl font-bold">Contact Us</h2>
      <form
        onSubmit={handleOnSubmit}
        className="flex flex-1 flex-col gap-4 mt-16 px-10 min-w-full lg:min-w-[500px]">
        {status.info.error && (
          <div className="bg-red-100 border border-red text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error</strong>{' '}
            <span className="block sm:inline">{status.info.msg}</span>
          </div>
        )}
        {status.submitted ? (
          <div className="text-white text-xl fond-bold px-4 py-3 rounded relative"
            role="alert">Your message has been successfully sent. We will contact you soon.</div>
        ) :
          <>
            <input
              onChange={handleOnChange}
              value={inputs.companyName}
              id="companyName"
              name="companyName"
              required
              maxLength={128}
              placeholder="Company name"
              type="text"
              className="bg-black text-white outline-none border-2 border-white rounded-3xl px-8 py-2"
            />
            <input
              onChange={handleOnChange}
              value={inputs.email}
              id="email"
              name="email"
              required
              maxLength={128}
              placeholder="Your E-mail"
              type="email"
              className="w-full bg-black text-white outline-none border-2 border-white rounded-3xl px-8 py-2"
            />
            <textarea
              onChange={handleOnChange}
              value={inputs.message}
              id="message"
              name="message"
              required
              maxLength={1000000}
              placeholder="Additional information"
              className="w-full min-h-[17rem] bg-black text-white outline-none border-2 border-white rounded-3xl px-8 py-2"
            />
            <div className="text-center mt-10">
              <button
                className="bg-white text-black rounded-3xl px-8 py-2"
                type="submit">
                {!status.submitting
                  ? !status.submitted
                    ? 'Submit'
                    : 'Submitted'
                  : 'Submitting...'}
              </button>
            </div>
          </>
        }
      </form>
    </div>
  )
}

export default ContactUs
