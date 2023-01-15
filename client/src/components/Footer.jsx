import React from "react";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <p>Copyright ⓒ {year} Jo Vincze</p>
    </footer>
  );
}