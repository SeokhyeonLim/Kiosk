import React, { useEffect, useRef } from "react";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import "./style.css";

const generateRandomString = () => window.btoa(Math.random()).slice(0, 20);

const CheckOut = ({ totalPrice, onClose }) => {
  const paymentWidgetRef = useRef(null);

  const handleClickPaymentButton = async () => {
    try {
      const paymentWidget = paymentWidgetRef.current;
      await paymentWidget?.requestPayment({
        orderId: generateRandomString(),
        orderName: "토스 티셔츠 외 2건",
        successUrl: window.location.origin + "/sandbox/success",
        failUrl: window.location.origin + "/sandbox/fail",
      });
    } catch (error) {
      console.error("결제 요청 실패:", error);
    }
  };

  useEffect(() => {
    const initializePaymentWidget = async () => {
      const paymentWidget = await loadPaymentWidget(
        "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm",
        ANONYMOUS
      );

      paymentWidgetRef.current = paymentWidget;

      paymentWidget.renderPaymentMethods(
        "#payment-method",
        { value: totalPrice },
        { variantKey: "DEFAULT" }
      );
      paymentWidget.renderAgreement("#agreement", { variantKey: "DEFAULT" });
    };

    initializePaymentWidget();
  }, [totalPrice]);

  return (
    <div className="wrapper w-100">
      <div className="max-w-540 w-100">
        <div id="payment-method" className="w-100" />
        <div id="agreement" className="w-100" />
        <div className="btn-wrapper w-100">
          <button className="btn secondary w-100" onClick={onClose}>
            취소
          </button>
          <button
            className="btn primary w-100"
            onClick={handleClickPaymentButton}
          >
            {totalPrice.toLocaleString()}원 결제하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
