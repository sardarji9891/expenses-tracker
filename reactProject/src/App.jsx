import "./App.css";
import { useState } from "react";
// Removed redundant import "react";
const datainput = {
  title: "",
  amount: "",
  category: "choose...",
  type: "debit",
};

function App() {
  const [valuee, setvaluee] = useState(datainput);
  const [submit, setsubmit] = useState([]);

  const expenses = ["choose...", "rent", "car", "others"];
  const heading = ["Title", "Category", "Amount", "Type"];

  const newdata = (e) => {
    e.preventDefault();

    if (valuee.title.trim() === "") return;
    if (valuee.amount === "" || parseFloat(valuee.amount) <= 0) return;
    if (valuee.category.trim() === "" || valuee.category === "choose...")
      return;

    setsubmit((prev) => [
      ...prev,
      {
        title: valuee.title,
        amount: parseFloat(valuee.amount),
        category: valuee.category,
        type: valuee.type,
      },
    ]);
    setvaluee(datainput); // Reset the form after submission
  };
  const totalamount = () => {
    return submit.reduce((acc, item) => {
      return item.type === "debit" ? acc - item.amount : acc + item.amount;
    }, 0);
  };

  return (
    <>
      <div className="fixed-top bg-white bg-opacity-50 border-bottom shadow-sm p-3">
        <h1 className=" text-center text-primary-emphasis sb-4 mb-4">
          Expense Tracker
        </h1>
        <div className=" d-flex justify-content-center ">
          <form className="row g-3" onSubmit={newdata}>
            <div className="col-md-5">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                value={valuee.title}
                onChange={(e) =>
                  setvaluee({ ...valuee, title: e.target.value })
                }
              />
            </div>
            <div className="col-md-5">
              <label className="form-label">Amount</label>
              <input
                type="number"
                className="form-control"
                value={valuee.amount}
                onChange={(e) =>
                  setvaluee({ ...valuee, amount: e.target.value })
                }
                onKeyDown={(e) => {
                  if (
                    e.key === "e" ||
                    e.key === "E" ||
                    e.key === "+" ||
                    e.key === "-"
                  ) {
                    e.preventDefault();
                  }
                }}
              />
            </div>
            <div className="col-md-10">
              <label className="form-label">Category</label>
              <select
                id="inputState"
                className="form-select"
                value={valuee.category}
                onChange={(e) =>
                  setvaluee({ ...valuee, category: e.target.value })
                }
              >
                {expenses.map((item, idx) => (
                  <option key={idx} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className=" d-flex col-10">
              <button
                type="button"
                className="btn btn-primary bg-danger  btn-animate rounded-5 m-2"
                onClick={() => setvaluee({ ...valuee, type: "debit" })}
              >
                debit
              </button>
              <button
                type="button"
                className="btn btn-primary bg-success  btn-animate rounded-5 m-2"
                onClick={() => setvaluee({ ...valuee, type: "credit" })}
              >
                credit
              </button>

              <button
                type="submit"
                className="btn btn-primary btn-animate w-25 ms-auto  my-2 "
              >
                save
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="m-4" style={{ paddingTop: "300px" }}>
        <div className="text-end pe-5 me-auto">
          <button
            type="button"
            className="btn btn-animate text-white bg-dark bg-opacity-75 rounded-pill"
            onClick={() => setsubmit((prev) => prev.slice(0, -1))}
          >
            {" "}
            Delete
          </button>
        </div>
        <h3 className="m-4 text-primary">Transactions ({submit.length})</h3>
        <div className="container text-center">
          <div className="row mt-2 mb-2 p-2 bg-danger-subtle">
            {heading.map((label, index) => (
              <h5 className="col" key={index}>
                {label}
              </h5>
            ))}
          </div>
          {submit.map((item, idx) => (
            <div className="row mt-2 bg-dark-subtle" key={idx}>
              <div className="col d-flex align-items-center justify-content-center">
                {item.title}
              </div>
              <div className="col d-flex align-items-center justify-content-center">
                {item.category}
              </div>
              <div className="col d-flex align-items-center justify-content-center">
                $ {item.amount}
              </div>
              <div
                className={
                  item.type === "debit"
                    ? "col d-flex align-items-center justify-content-center text-white bg-danger"
                    : "col d-flex align-items-center justify-content-center text-white bg-success"
                }
              >
                {item.type}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="fixed-bottom bg-white ">
        <div className="text-end pt-2 pe-5 me-auto mb-3">
          <strong className="me-5   pe-5">
            {" "}
            Total Amount: {""}
            <span
              className={totalamount() >= 0 ? "text-success" : "text-danger"}
            >
              ${totalamount()}
            </span>
          </strong>
        </div>
      </div>
    </>
  );
}

export default App;
