"use client";
import config from "@/lib/config.json";
import { getListPage } from "@/lib/contentParser";
// import PageHeader from "@/components/PageHeader";
import SeoMeta from "@/components/SeoMeta";
import { Container } from "@/components/layouts/Container";
import { useState, useRef } from "react";
import { sendContactForm } from '@/lib/firebaseContactForm'
import PageTitle from "@/components/PageTitle";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const formRef = useRef()

  async function handleSubmit(event) {
    event.preventDefault();
    // const formData = new FormData(event.target);
    const res = await sendContactForm({
      name: name,
      email: email,
      subject: subject,
      message: message,
    });
    if (res == 0) {
      setMessage("Thank you for your valuable comment!");
      //formRef.current.reset();
      setName(''),
      setName(''),
      setEmail(''),
      setMessage('')
    } else {
      setMessage("Something went wrong! Please try again");
    }
  }


  // async function handleSubmit(event) {
  //   event.preventDefault();
  //   const formData = new FormData(event.target);
  //   try {
  //     const response = await fetch("api/contact", {
  //       method: "post",
  //       body: formData,
  //     });

  //     if (!response.ok) {
  //       console.log("falling over");
  //       throw new Error(`response status: ${response.status}`);
  //     }
  //     const responseData = await response.json();
  //     console.log(responseData["message"]);

  //     alert("Message successfully sent");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error, please try resubmitting the form");
  //   }
  // }


  return (
    <Container>
      {/* <SeoMeta
        title={title}
        meta_title={meta_title}
        description={description}
        image={image}
      /> */}
      <PageTitle title={"Contacto"} />

      <div className="py-10  grid grid-cols-1 lg:grid-cols-2 justify-between gap-10">
        <div className="flex flex-col gap-5">
          <div className="text-3xl">Hello there! </div>
          <div>
            If you have any concerns or recommendations, or maybe you just want
            to reach us, feel free to send us a Message and we will be in touch.
          </div>
        </div>

        <div className="mx-auto container  border border-spacing-1 border-slate-700">
         <div className="p-10 flex flex-col gap-3">
          <div className="text-3xl">Deja tu mensaje</div>
          <form 
          onSubmit={handleSubmit}
          ref={formRef}
          >

            <div className="mb-6">
             
              <input
                id="form-name"
                name="name"
                className="form-input"
                placeholder="Nombre*"
                required
                onChange={(e) => {
                  setName(e.target.value);
                }}
                type="text"
              />
            </div>

            <div className="mb-6">
             
              <input
                id="form-email"
                name="email"
                className="form-input"
                placeholder="E-mail*"
                required
                maxLength={80}
                autoComplete="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
              />
            </div>

            <div className="mb-6">
              
              <input
                id="form-subject"
                name="subject"
                className="form-input"
                placeholder="Asunto*"
                required
                maxLength={80}
                autoComplete="subject"
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
                type="text"
              />
            </div>

            <div className="mb-6">
            
              <textarea
                id="form-message"
                name="message"
                required
                className="form-input max-w-xl"
                placeholder="Tu mensaje*"
                rows={8}
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              ></textarea>
            </div>

            <button
              type="submit"
              className=" mt-5 border-[1px] border-slate-400 rounded-sm text-sm 
                   tracking-wider  dark:text-slate-400 text-dark flex px-6 py-3 uppercase
                   hover:bg-primary hover:text-black group-dark:hover:text-black"
            >
              Enviar
            </button>
          </form>
        </div>
        </div>
      </div>
    </Container>
  );
};

export default Contact;
