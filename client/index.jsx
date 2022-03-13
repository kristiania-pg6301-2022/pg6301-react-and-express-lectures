import React from "react";
import ReactDOM from "react-dom";

function Application() {
  return (
    <>
      <header>Kristiania Chat</header>
      <main>
        <div>Message 1</div>
        <div>Message 2</div>
      </main>
      <footer>
        <form>
          <input autoFocus={true} />
          <button>Send</button>
        </form>
      </footer>
    </>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
