import React from "react";
import { useSignMessage } from "wagmi";
import { verifyMessage } from "ethers/lib/utils";

const SignMessage = () => {
  const recoveredAddress = React.useRef(null);
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess(data, variables) {
      // Verify signature when sign message succeeds
      const address = verifyMessage(variables?.message, data);
      recoveredAddress.current = address;
    },
  });

  const handleSignIn = () => {
    signMessage({ message: "We are verifying your credentials." });
  };

  const handleSignUp = ({ name, information }) => {
    console.log("👉 | handleSignUp", name, information);
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="d-flex">
        <button
          className="btn btn-block btn-success"
          disabled={isLoading}
          onClick={handleSignIn}
          style={{ marginRight: "10px" }}
        >
          Sign In
        </button>
        <button
          className="btn btn-block btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Sign Up
        </button>
      </div>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="signUpModal"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="signUpModal">
                Sign Up
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                className="d-flex flex-column justify-content-center align-items-center"
                onSubmit={(event) => {
                  event.preventDefault();
                  const formData = new FormData(event.target);
                  const name = formData.get("name");
                  const information = formData.get("information");
                  handleSignUp({ name, information });
                }}
              >
                <div className="mb-3 w-100">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                  />
                </div>
                <div className="mb-3 w-100">
                  <label htmlFor="information" className="form-label">
                    Information
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="information"
                    name="information"
                  />
                </div>

                <div className="d-flex w-100 justify-content-between">
                  <div>
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="reset" className="btn btn-warning">
                      Reset
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isLoading}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {data && (
        <div>
          <div>Recovered Address: {recoveredAddress.current}</div>
          <div>Signature: {data}</div>
        </div>
      )}

      {error && <div>{error?.reason}</div>}
    </div>
  );
};

export default SignMessage;
