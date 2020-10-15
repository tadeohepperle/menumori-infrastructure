import { useRouter } from "next/router";
import { useState, useContext } from "react";
import { waitPromise } from "../services/utility";
import {
  BugsForm,
  BugsHeader,
  BugsList,
  GlobalStoreContext,
} from "../store/globalStore";
import Spinner from "./small/Spinner";

export default function LoginForm() {
  const [state, setState] = useState({
    password: "",
    username: "",
    processing: false,
    error: "",
  });
  const store = useContext(GlobalStoreContext);
  const router = useRouter();
  return (
    <div className="mx-auto mb-32 mt-0 sm:mt-32 w-full md:w-1/2 lg:w-1/3">
      <form
        class="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto mt-10 md:mt-0"
        onSubmit={async (e) => {
          e.preventDefault();
          state.processing = true;
          setState({ ...state, processing: true, error: "" });
          let loginSuccessfull = await store.login(
            state.username,
            state.password
          );
          if (loginSuccessfull) await router.push("/dashboard");
          let error = loginSuccessfull
            ? ""
            : "Login fehlgeschlagen. Bitte versuchen Sie es erneut.";
          setState({ ...state, processing: false, error });
        }}
      >
        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">
          Kunden-Login
        </h2>
        <input
          class="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
          placeholder="max@mustermann.de"
          //type="email"
          name="username"
          value={state.username}
          onChange={(e) => {
            if (state.processing) return;
            setState({ ...state, username: e.target.value });
          }}
        />
        <input
          class="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
          placeholder="*********"
          name="password"
          type="password"
          value={state.password}
          onChange={(e) => {
            if (state.processing) return;
            setState({ ...state, password: e.target.value });
          }}
        />
        <button
          type="submit"
          disabled={state.processing}
          class={`text-white ${
            state.processing ? `bg-gray-500` : `bg-teal-500  hover:bg-teal-600`
          } border-0 py-2 px-8 focus:outline-none  rounded text-lg flex  justify-center h-10`}
        >
          {!state.processing ? "Login" : <Spinner></Spinner>}
        </button>
        <p class="text-xs text-gray-500 mt-3">
          Login für unsere Kunden um Accounteinstellungen zu verwalten.
        </p>
        {state.error && (
          <div className="rounded bg-red-200 text-red-700 text-center w-full my-3 px-6 py-2">
            {state.error}
          </div>
        )}
      </form>
    </div>
  );
}
