import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Css/ConfirmId.css";

const ComfirmId = () => {
  const [userId, setUserId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // 기존 에러 메시지 초기화

    try {
      const response = await fetch("http://localhost:5000/check_userId", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }), // 입력한 아이디 전달
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        // 아이디가 존재하는 경우 다음 단계로 진행
        console.log("아이디가 확인되었습니다.");
        navigate("/forgetPass");
      } else {
        // 아이디가 존재하지 않는 경우
        setErrorMessage(data.message);
        alert("해당하는 아이디가 존재하지 않습니다.");
      }
    } catch (error) {
      console.error("서버와의 통신 중 오류가 발생했습니다.", error);
      setErrorMessage("서버 오류가 발생했습니다.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src="/CaffeIcon/CaffeLogo.png" alt="CaffeLogo" />
        <h3>비밀번호를 찾고자하는 아이디를 입력해주세요.</h3> <br />
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />{" "}
        <br /> {/* 값이 변경될 때마다 상태를 업데이트*/}
        <button type="submit">다음</button> <br />
        {errorMessage && <p className="error-message">{errorMessage}</p>}{" "}
        {/* 에러 메시지 표시 */}
        아이디가 기억나지 않는다면? <a href="#">아이디 찾기</a>
      </form>
    </div>
  );
};

export default ComfirmId;
