import React, { useState } from "react";
import "./ShoppingCss/TableSelect.css";
import Modal from "react-modal";
import Payment from "./Payment.js";

const TableSelect = ({ onClose, totalPrice, onCheckout }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleTableClick = (tableNumber) => {
    setSelectedTable(tableNumber);
  };

  const Select_btn = () => {
    if (selectedTable !== null) {
      setModalIsOpen(false);
      setShowPayment(true);
    } else {
      alert("테이블을 선택해주세요.");
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={onClose}
        className="Table-modal"
        overlayClassName="Table-overlay"
      >
        <div className="Table_title">
          <h1>테이블 선택</h1>
        </div>
        <div className="Table_number">
          <table>
            <tbody>
              <tr>
                <td>
                  <button
                    onClick={() => handleTableClick(1)}
                    className={selectedTable === 1 ? "selected" : ""}
                  >
                    1
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleTableClick(2)}
                    className={selectedTable === 2 ? "selected" : ""}
                  >
                    2
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleTableClick(3)}
                    className={selectedTable === 3 ? "selected" : ""}
                  >
                    3
                  </button>
                </td>
              </tr>
              <tr>
                <td>
                  <button
                    onClick={() => handleTableClick(4)}
                    className={selectedTable === 4 ? "selected" : ""}
                  >
                    4
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleTableClick(5)}
                    className={selectedTable === 5 ? "selected" : ""}
                  >
                    5
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => handleTableClick(6)}
                    className={selectedTable === 6 ? "selected" : ""}
                  >
                    6
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button className="Select_btn" onClick={Select_btn}>
          선택완료
        </button>
      </Modal>
      {showPayment && (
        <Modal
          isOpen={showPayment}
          onRequestClose={() => setShowPayment(false)}
          className="Payment-modal"
          overlayClassName="Payment-overlay"
        >
          <Payment
            totalPrice={totalPrice} // totalPrice 전달
            onCheckout={onCheckout} // onCheckout 함수 전달
            onClose={() => setShowPayment(false)}
          />
        </Modal>
      )}
    </div>
  );
};

export default TableSelect;
