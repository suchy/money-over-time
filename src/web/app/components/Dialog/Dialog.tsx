import { Link, useNavigate } from '@remix-run/react';
import FocusTrap from 'focus-trap-react';
import { KeyboardEvent, MouseEvent, ReactNode, useEffect, useRef } from 'react';

interface DialogProps {
  children: ReactNode;
  closeUrl: string;
}

export const Dialog = ({ children, closeUrl }: DialogProps) => {
  const navigate = useNavigate();

  const closeLinkRef = useRef(null);

  const handleBackdropClick = (event: MouseEvent) => {
    // event.stopPropagation();
    // navigate(closeUrl);
  };

  const handleEscPress = (event: KeyboardEvent<HTMLDivElement>) => {
    const isEscPressed = [
      event.key === 'Escape',
      event.key === 'Esc',
      event.keyCode === 27
    ].includes(true);

    if (isEscPressed) {
      navigate(closeUrl);
    }
  };

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];

    body.classList.add('overflow-hidden');

    return () => {
      body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <FocusTrap>
      <div
        className="fixed top-0 left-0 z-20 h-screen w-screen overflow-auto bg-black/50"
        onClick={handleBackdropClick}
        tabIndex={-1}
      >
        <section
          className="relative mx-auto mt-14 max-w-md rounded-md bg-white p-4 shadow-lg"
          onKeyDown={handleEscPress}
        >
          <Link
            aria-label="Close"
            className="absolute top-4 right-4"
            to={closeUrl}
            ref={closeLinkRef}
          >
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              className="w-3 text-inherit"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
              ></path>
            </svg>
          </Link>

          {children}
        </section>
      </div>
    </FocusTrap>
  );
};
