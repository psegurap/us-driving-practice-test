"use server";
import { ContactInfoType } from "@/types";
import { Resend, CreateEmailResponse } from "resend";
import ContactFormTemplate from "@/email/contact-form-template";

const resend = new Resend(`${process.env.RESEND_API_KEY}`);

export async function SendContactForm(info: ContactInfoType) {
  try {
    const response: CreateEmailResponse = await resend.emails.send({
      from: "Conduce en Estados Unidos <support@conduceenestadosunidos.com>",
      to: [`${process.env.RESEND_TO_EMAIL}`],
      subject: "Messaje from Conduce en Estados Unidos",
      html: ContactFormTemplate(info),
    });

    const { data, error } = response;

    if (error) {
      console.log(error.message);
      return "error";
    }

    return "success";
  } catch (error) {
    console.log(error);
    return "error";
  }
}
