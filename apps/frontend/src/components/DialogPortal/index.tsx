import { MouseEventHandler, PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  portalKey: string;
};
export const DialogPortal = ({
  children,
  portalKey,
  ...backgroundOverlayProps
}: PropsWithChildren<Props & BackGroundOverlayProps>) =>
  createPortal(
    <BackGroundOverlay {...backgroundOverlayProps}>
      {children}
    </BackGroundOverlay>,
    document.body,
    portalKey,
  );

type BackGroundOverlayProps = {
  zIndex?: number;
  onClick?: MouseEventHandler<HTMLDivElement>;
};
const BackGroundOverlay = ({
  zIndex = 999999,
  onClick,
  children,
}: PropsWithChildren<BackGroundOverlayProps>) => {
  // children を中央よせにする
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center"
      style={{ zIndex }}
    >
      <div
        className="fixed top-0 left-0 w-full h-screen animate-fadeIn bg-black bg-opacity-50"
        onClick={onClick}
      />
      {children}
    </div>
  );
};
