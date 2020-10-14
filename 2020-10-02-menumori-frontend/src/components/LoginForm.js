import { Component } from "react";

export default class LoginForm extends Component {
  state = { username: "", password: "" };

  constructor(props) {
    super(props);
    this.loginClickHandler = this.loginClickHandler.bind(this);
    this.changeInputValue = this.changeInputValue.bind(this);
  }
  loginClickHandler() {
    console.log("click");
  }

  changeInputValue(key, value) {
    this.setState((old) => {
      old[key] = value;
      return old;
    });
  }

  render() {
    return (
      <div className="mx-auto mb-32 mt-0 sm:mt-32">
        <div class="bg-gray-200 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 class="text-gray-900 text-lg font-medium title-font mb-5">
            Kunden-Login
          </h2>
          <input
            class="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
            placeholder="max@mustermann.de"
            type="email"
            onChange={(e) => {
              this.changeInputValue("username", e.target.value);
            }}
          />
          <input
            class="bg-white rounded border border-gray-400 focus:outline-none focus:border-teal-500 text-base px-4 py-2 mb-4"
            placeholder="*********"
            type="password"
            onChange={(e) => {
              this.changeInputValue("password", e.target.value);
            }}
          />
          <button
            onClick={this.loginClickHandler}
            class="text-white bg-teal-500 border-0 py-2 px-8 focus:outline-none hover:bg-teal-600 rounded text-lg"
          >
            Login
          </button>
          <p class="text-xs text-gray-500 mt-3">
            Login für unsere Kunden um Accounteinstellungen zu verwalten.
          </p>
        </div>
      </div>
    );
  }
}
