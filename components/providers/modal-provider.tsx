'use client';

import { ReactElement, useEffect, useState } from 'react';
import SettingsModal from '../modals/settings';

const ModalProvider = (): ReactElement => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <></>;
  }
  return (
    <>
      <SettingsModal />
    </>
  );
};

export default ModalProvider;
