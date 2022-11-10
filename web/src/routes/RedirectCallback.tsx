import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "antd";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FullPageError } from "~/components/FullPageError";
import { FullPageLoader } from "~/components/FullPageLoader";

export const RedirectCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading, user } = useAuth0();

  console.log("RedirectCallback", { isAuthenticated, isLoading, user });

  useEffect(() => {
    if (isAuthenticated) {
      const { state } = location;
      navigate({ pathname: state?.redirect ?? "/", search: state?.search });
    }
  }, [isAuthenticated]);

  if (isLoading) {
    return <FullPageLoader />;
  }

  return (
    <FullPageError title="Oops" message="Something went wrong">
      <Button onClick={() => navigate({ pathname: "/login" })}>
        Return to login
      </Button>
    </FullPageError>
  );
};
