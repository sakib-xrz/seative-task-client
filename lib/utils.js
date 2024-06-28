import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import HttpKit from "@/common/HttpKit";
import { AUTH_TOKEN_KEY } from "./keyChain";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function deferred() {
  let _deferred = {};
  _deferred.promise = new Promise(function (resolve, reject) {
    _deferred.resolve = resolve;
    _deferred.reject = reject;
  });
  return _deferred;
}

export const setTokenAndRedirect = async (token, redirect = () => {}) => {
  try {
    const client = await HttpKit.setClientToken(token);
    const authToken =
      client.defaults.headers.common["Authorization"].split(" ")[1];
    localStorage.setItem(AUTH_TOKEN_KEY, authToken);
    HttpKit.defer.resolve(client);
    redirect();
  } catch (error) {
    console.error(error);
  }
};
