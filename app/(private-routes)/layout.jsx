import AuthGuardHoc from "@/components/hoc/AuthGaurdHoc";
import Header from "./_components/header";
import Container from "@/components/shared/Container";

export default function PrivateRouteLayout({ children }) {
  return (
    <Container>
      <Header />
      <AuthGuardHoc>{children}</AuthGuardHoc>
    </Container>
  );
}
