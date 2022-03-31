import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const LoginContext = createContext({ session: null });

export const LoginProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <LoginContext.Provider value={{ session, setSession }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
