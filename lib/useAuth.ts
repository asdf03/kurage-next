"use client";

import supabase from "@/lib/supabase";
import { Session } from "@supabase/supabase-js";
import { useEffect, useState } from "react";

const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const { data: authData } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    return () => authData.subscription.unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        console.error("サインインに失敗しました。");
      }
    }
  };

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        console.error("サインアップに失敗しました。");
      }
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const userProfile: {
  } = {
  };

  return {
    session,
    error,
    userProfile,
    signInWithEmail,
    signUpWithEmail,
    signOut,
  };
};

export default useAuth;
