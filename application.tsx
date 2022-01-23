import * as React from "react";

export function Application({ who }: { who: string }) {
  let greeting = "Hello";
  return <h1>Hello {who}</h1>;
}
