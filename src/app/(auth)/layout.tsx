import { FC, PropsWithChildren } from "react";

const AuthenticationLayout: FC<PropsWithChildren<void>> = ({ children }) => {
  return (
    <main className="container grid h-dvh place-content-center pt-4 md:pt-0">
      {children}
    </main>
  );
};

export default AuthenticationLayout;
