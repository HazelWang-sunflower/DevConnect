import { useState } from "react";
import { createPortal } from "react-dom";
import { Button } from "../ui/button";

const rootElement = document.getElementById("root")!;
type PortalDialogProps = {
  visiable: boolean;
  children: React.ReactNode;
  onHide: () => void;
};
export default function PortalDialog(props: PortalDialogProps) {
  const { visiable, children, onHide } = props;
  return (
    <>
      {visiable &&
        createPortal(
          <div className="portal-custom">
            {children}
            <Button onClick={onHide}>close</Button>
          </div>,
          rootElement
        )}
    </>
  );
}
