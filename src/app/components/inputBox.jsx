"use client";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa6";
import { FaUnlockKeyhole } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";

function InputBox({name,type, id, value, placeholder, icon}) {
  const iconMapper = {
    'user': <FaRegUser className="input-icon" />,
    'email': <FaRegEnvelope className="input-icon" />,
    'password': <FaUnlockKeyhole className="input-icon" />
  }

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="relative w-full mb-4">
      <input type={type === "password" ? passwordVisible ? "text" : "password" : type} name={name} placeholder={placeholder} id={id} defaultValue={value} className="input-box" />
      {iconMapper[icon]}
      {type === "password" ?
        <span className="input-icon left-auto right-4 cursor-pointer" onClick={() => setPasswordVisible(prev => !prev)}>
          {passwordVisible ? <FaEye /> : <FaEyeSlash />}
        </span> : ""}
    </div>
  )
}

export default InputBox