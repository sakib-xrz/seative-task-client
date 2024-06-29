import Header from "../_components/header";

export default function TaskLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
