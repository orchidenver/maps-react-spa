import React, { useEffect } from "react";
import { ProviderInterface } from "../types";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function ProtextedRoute({ children }: ProviderInterface) {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}
