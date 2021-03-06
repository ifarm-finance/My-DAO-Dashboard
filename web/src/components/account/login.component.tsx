import { Avatar, Button } from "antd";
import React, { useContext } from "react";
import { MetamaskContext } from "../../contexts/metamask.context";
import { useProgress } from "../../util/use-progress";

interface Props {
  onError?: (message: string) => void;
}

export const LoginComponent: React.FC<Props> = props => {
  const metamask = useContext(MetamaskContext);
  const progress = useProgress(false);

  const onClick = async () => {
    if (!progress.isRunning()) {
      progress.start();
      try {
        await metamask.enable();
      } catch (e) {
        progress.stop(e);
      }
    }
  };

  const renderError = () => {
    const error = progress.isError();
    if (error && props.onError) {
      props.onError(error);
      return undefined;
    } else {
      return undefined;
    }
  };

  const renderButton = () => {
    if (progress.isRunning()) {
      return (
        <Button type="primary" data-test-id={"connect-button"} disabled>
          Connecting..
        </Button>
      );
    } else {
      return (
        <Button type="primary" data-test-id={"connect-button"} onClick={onClick}>
          Connect
        </Button>
      );
    }
  };

  return (
    <div data-test-id={"login-component"} style={{ textAlign: "center" }}>
      <Avatar size={64} icon="user" />
      <p data-test-id={"login-component-welcome"}>You are not logged in</p>
      {renderError()}
      {renderButton()}
    </div>
  );
};
