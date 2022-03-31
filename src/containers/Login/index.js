import { useRef, useState } from "react";
import If from "../../components/If";

import { supabase } from "../../utils/supabaseClient";
import { showToast, throttleFn } from "../../utils/helperFunction";
import {
  ERROR,
  MAGIC_LINK_SENT,
  SUCCESS,
  THIRD_PARTY_LOGIN,
} from "../../utils/constants";

import "./index.css";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const ref = useRef(null);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw Error(error);
      showToast({
        element: ref.current,
        message: MAGIC_LINK_SENT,
        type: SUCCESS,
      });
    } catch (error) {
      showToast({
        element: ref.current,
        message: error.error_description || error.message,
        type: ERROR,
      });
    } finally {
      setLoading(false);
      setEmail("");
    }
  };

  const handleThirdPartyLogin = () => {
    showToast({
      element: ref.current,
      message: THIRD_PARTY_LOGIN,
    });
  };

  const throttledLogin = throttleFn(handleLogin, 1500);
  const throttledThirdPartyLogin = throttleFn(handleThirdPartyLogin, 1500);

  return (
    <div className="card-wrapper vertical">
      <div id="toast" className="toast" ref={ref}>
        <p className="toast-text"></p>
      </div>
      <h3 className="h3">Sign in to BookmarkIt</h3>
      <div className="flex row" onClick={throttledThirdPartyLogin}>
        <button className="icon-btn">
          <i className="fa fa-brands fa-google icon-login" />
        </button>
        <button className="icon-btn">
          <i className="fa fa-brands fa-github icon-login" />
        </button>
        <button className="icon-btn">
          <i className="fa fa-brands fa-twitter icon-login" />
        </button>
      </div>
      <div className="flex row">
        <hr className="hr" />
        <p>Or</p>
        <hr className="hr" />
      </div>
      <div aria-live="polite">
        <p className="description">
          Sign in via magic link with your email below
        </p>

        <form
          className="flex column"
          onSubmit={(e) => {
            e.preventDefault();
            throttledLogin();
          }}
        >
          <input
            id="email"
            className="input"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="icon-btn">
            <If
              condition={!loading}
              otherwise={
                <i className="fa fa-solid fa-spinner icon-login magic-link-icon loading" />
              }
            >
              <i className="fa fa-solid fa-wand-magic icon-login magic-link-icon">
                &nbsp; Sign In
              </i>
            </If>
          </button>
        </form>
      </div>
    </div>
  );
}
