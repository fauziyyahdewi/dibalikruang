import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  title: string;
  image: string;
  description: string;
  linkText: string;
  link: string;
};

const EsentialCard = ({ title, image, description, linkText, link }: Props) => {
  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <Image
          src={image}
          alt={title}
          width={80}
          height={80}
          className="object-contain mx-auto"
        />
        <h1 className="text-center text-lg mt-5 mb-5 font-semibold text-gray-800">
          {title}
        </h1>
        <p className="text-gray-600 text-center font-medium text-sm mb-7">
          {description}
        </p>
      </div>

      <p className="text-center font-semibold text-brand-brown hover:text-zinc-800 transition-all duration-200 mt-auto">
        <Link href={`${link}`}>{linkText}</Link>
      </p>
    </div>
  );
};

export default EsentialCard;
