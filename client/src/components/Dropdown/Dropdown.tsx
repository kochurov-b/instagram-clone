import React, { FC, ReactNode, useEffect, useRef, useState } from 'react';

import './Dropdown.style.scss';

type TProps = {
  as: ReactNode;
};

type THandleClickOutside = (event: MouseEvent) => void;

export const Dropdown: FC<TProps> = ({ as, children }) => {
  const [open, setOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const menuClass = `dropdown__menu${open ? ' dropdown__menu--visible' : ''}`;

  const handleClick = () => setOpen((prevState) => !prevState);

  const handleClickOutside: THandleClickOutside = ({ target }) => {
    if (rootRef.current && !rootRef.current.contains(target as Element)) {
      setOpen(() => false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);

    return () =>
      document.removeEventListener('click', handleClickOutside, true);
  }, [rootRef]);

  return (
    <div ref={rootRef} className="dropdown">
      <button className="dropdown__button" onClick={handleClick}>
        {as}
      </button>
      <menu className={menuClass}>{children}</menu>
    </div>
  );
};
