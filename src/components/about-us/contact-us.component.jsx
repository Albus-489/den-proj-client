import React, { useState } from 'react';
import { BtnComponent } from '../btn/btn-component';
import { useTranslation } from 'react-i18next';

export const ContactUsComponent = () => {
  const [t] = useTranslation();
  const [formErrors, setFormErrors] = useState({});

  const handleValidation = (formData) => {
    let errors = {};
    if (!formData.get('Name')) {
      errors.name = t('contact-us.errors.nameRequired');
    }
    if (!formData.get('Email')) {
      errors.email = t('contact-us.errors.emailRequired');
    }
    if (!formData.get('Phone')) {
      errors.phone = t('contact-us.errors.phoneRequired');
    }
    if (!formData.get('Message')) {
      errors.message = t('contact-us.errors.messageRequired');
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    const errors = handleValidation(formData);

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    } else {
      setFormErrors({});
    }

    const data = {
      name: formData.get('Name'),
      email: formData.get('Email'),
      phone: formData.get('Phone'),
      message: formData.get('Message'),
    };

    const chatIds = import.meta.env.VITE_REACT_APP_TELEGRAM_CHAT_IDS.split(',');

    for (const chatId of chatIds) {
      await sendMessage(chatId, data);
    }
  };

  return (
    <div
      id="contact-us"
      className="about-us-cmp my-0 mx-auto items-center justify-center 
                    w-[500px] max-sm:max-w-[320px] 
                    shadow-2xl p-5 
                    rounded-lg
                    dark:bg-[#110f1947] bg-[#ffffff70]">
      <form onSubmit={handleSubmit}>
        <div className="text-end">{t('contact-us.slogan')}</div>
        <div className="text-2xl font-bold mb-10">
          {t('contact-us.heading')}
        </div>

        <div className="form-inputs flex flex-col items-center justify-center gap-5 w-full">
          <ContactFormCmp formType="Name" error={formErrors.name} />
          <ContactFormCmp formType="Email" error={formErrors.email} />
          <ContactFormCmp formType="Phone" error={formErrors.phone} />
          <TextAreaCmp error={formErrors.message} />
        </div>

        <div className="about-us-btns mt-10 flex justify-end">
          <button
            type="submit"
            className="appearance-none focus:outline-none p-0 m-0 bg-transparent border-none w-[150px]">
            <BtnComponent btnType="wide" btnText={t('contact-us.btn-text')} />
          </button>
        </div>
      </form>
    </div>
  );
};

const ContactFormCmp = ({ formType, error }) => {
  const [t] = useTranslation();
  const placeholders = {
    Name: t('contact-us.form-content.name'),
    Email: t('contact-us.form-content.email'),
    Phone: t('contact-us.form-content.phone'),
  };

  const inputTypes = {
    Name: 'text',
    Email: 'email',
    Phone: 'tel',
  };

  return (
    <div className="flex flex-col justify-between w-full">
      <div className="form-name px-12">{placeholders[formType]}</div>
      <input
        className="bg-transparent my-0 mx-auto w-[80%] max-sm:w-[90%]
                                  border-[1px] border-dark-background dark:border-dark-foreground
                                  rounded-2xl text-center focus:outline-none h-9"
        type={inputTypes[formType]}
        name={formType}
        placeholder={placeholders[formType]}
      />
      {error && (
        <div className="text-red-500 text-xs mt-1 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

const TextAreaCmp = ({ label = 'Message', maxLength = 1500, error }) => {
  const [t] = useTranslation();

  return (
    <div className="flex flex-col w-full mt-5">
      <label className="form-label mb-2 text-center">
        {t('contact-us.form-content.message')}
      </label>
      <textarea
        className="bg-transparent w-full p-2
                                  border-[1px] border-dark-background dark:border-dark-foreground
                                  rounded-2xl focus:outline-none max-h-44 min-h-24 overflow-auto"
        placeholder={t('contact-us.form-content.message')}
        maxLength={maxLength}
        name={label}></textarea>
      {error && (
        <div className="text-red-500 text-xs mt-1 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

const sendMessage = async (chatId, data) => {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot${
        import.meta.env.VITE_REACT_APP_TELEGRAM_BOT_TOKEN
      }/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nMessage: ${data.message}`,
        }),
      }
    );
    const result = await response.json();
    console.log('Message sent to chatId:', chatId, 'Response:', result);
  } catch (error) {
    console.error('Error sending message to chatId:', chatId, error);
  }
};
