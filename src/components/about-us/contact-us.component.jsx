import React from 'react';
import { BtnComponent } from '../btn/btn-component';
import { useTranslation } from 'react-i18next';

export const ContactUsCpmponent = () => {
  const [t, i18n] = useTranslation();

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

        <div className="form-inputs flex flex-col items-center justify-center gap-4 w-full">
          <ContactFormCmp />
          <ContactFormCmp formType="Email" />
          <TextAreaCmp maxLength={200} />
        </div>

        <div className="about-us-btns mt-10 flex justify-end">
          <button
            type="submit"
            className="appearance-none focus:outline-none p-0 m-0 bg-transparent border-none w-[150px]">
            <BtnComponent className="" btnType="wide" btnText={t('contact-us.btn-text')} />
          </button>
        </div>
      </form>
    </div>
  );
};

const ContactFormCmp = ({ formType = 'Name' }) => {
  const [t, i18n] = useTranslation();
  return (
    <div className="flex max-sm:flex-col max-sm:items-center justify-between w-full">
      <div className="form-name">
        {formType === 'Name'
          ? t('contact-us.form-content.name')
          : t('contact-us.form-content.email')}
      </div>
      <input
        className="bg-transparent w-[80%] max-sm:w-[90%]
                                  border-[1px] border-dark-background dark:border-dark-foreground
                                  rounded-2xl text-center focus:outline-none h-9"
        type={formType === 'Name' ? 'username' : 'email'}
        name={formType}
        placeholder={
          formType === 'Name'
            ? t('contact-us.form-content.name')
            : t('contact-us.form-content.email')
        }
      />
    </div>
  );
};

const TextAreaCmp = ({ label = 'Message', maxLength = 1500 }) => {
  const [t, i18n] = useTranslation();

  return (
    <div className="flex flex-col w-full mt-5">
      <label className="form-label mb-2 text-center">{t('contact-us.form-content.message')}</label>
      <textarea
        className="bg-transparent w-full p-2
                                  border-[1px] border-dark-background dark:border-dark-foreground
                                  rounded-2xl focus:outline-none max-h-28 min-h-24 overflow-hidden"
        placeholder={t('contact-us.form-content.message')}
        maxLength={maxLength}
        name={label}></textarea>
    </div>
  );
};

const handleSubmit = async (event) => {
  event.preventDefault();

  const form = event.target;

  const formData = new FormData(form);

  // Debug logs

  const data = {
    name: formData.get('Name'),
    email: formData.get('Email'),
    message: formData.get('Message'),
  };

  const chatIds = ['382706275', '156468920'];

  for (const chatId of chatIds) {
    await sendMessage(chatId, data);
  }
};

const sendMessage = async (chatId, data) => {
  try {
    const response = await fetch(
      `https://api.telegram.org/bot7197753056:AAEfHRLI4onyfvrw2SBHp-eDDLsSRHl7QOk/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: `Name: ${data.name}\nEmail: ${data.email}\nMessage: ${data.message}`,
        }),
      }
    );
    const result = await response.json();
    console.log('Message sent to chatId:', chatId, 'Response:', result);
  } catch (error) {
    console.error('Error sending message to chatId:', chatId, error);
  }
};
