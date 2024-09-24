import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPass = () => {
  const [userTel, setUserTel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // 기존 에러 메시지 초기화

    const validatePhone = (userTel) => {
      const regex = /^010-\d{4}-\d{4}$/;
      return regex.test(userTel);
    };

    if (!validatePhone(userTel)) {
      alert("전화번호는 010-xxxx-xxxx 형식으로 입력해주세요.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/check_userTel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userTel }), // 입력한 아이디 전달
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        // 아이디가 존재하는 경우 다음 단계로 진행
        console.log("전화번호가 존재");
        alert("비밀번호는 " + data.password + "입니다.");
        navigate("/");
      } else {
        // 아이디가 존재하지 않는 경우
        setErrorMessage(data.message);
        alert("해당하는 전화번호가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("서버와의 통신 중 오류가 발생했습니다.", error);
      setErrorMessage("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login-container" onSubmit={handleSubmit}>
      <form className="login-form">
        <h1>비밀번호 찾기</h1>
        <input
          type="text"
          placeholder="전화번호"
          value={userTel}
          onChange={(e) => setUserTel(e.target.value)}
        />
        <button type="submit">찾기</button>
      </form>
    </div>
  );
};

export default ForgetPass;
