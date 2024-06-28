import AuthGuardHoc from "@/components/hoc/AuthGaurdHoc";

export default function PrivateRouteLayout({ children }) {
  return (
    <div>
      <AuthGuardHoc>{children}</AuthGuardHoc>
    </div>
  );
}
