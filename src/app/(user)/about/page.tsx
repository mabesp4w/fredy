/** @format */
"use client";
import ScrollRevealComponent from "@/components/effects/ScrollRevealComponent";
import React from "react";

const page = () => {
  return (
    <section className="container flex flex-col">
      <div>
        <ScrollRevealComponent
          animations="zoom-in-up"
          className="text-center font-amsterdam-one text-3xl"
        >
          Dapoer Alea
        </ScrollRevealComponent>
      </div>
      <div className="w-full border">
        <iframe
          className="w-full h-[70svh]"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63771.20642756552!2d140.59795412999554!3d-2.603378478125586!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x686cf59a156e0ae3%3A0xc93ef95b534cc1c7!2sDapoer%20alea!5e0!3m2!1sen!2sid!4v1732588237052!5m2!1sen!2sid"
          loading="lazy"
        ></iframe>
      </div>
    </section>
  );
};

export default page;
