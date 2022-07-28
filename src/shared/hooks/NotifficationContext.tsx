import React, { useState, FC, useCallback } from "react";

export interface NotifficationProviderProps {
  children: React.ReactNode;
}

export interface NotificationType {
  title: string | JSX.Element;
  message: string | JSX.Element | null;
  onClose: () => Promise<void>;
}

export interface NotifficationContextType {
  notiffication: NotificationType | null;
  addNotiffication: (notiffication: NotificationType) => void;
  removeNotiffication: (option: boolean) => void;
}

export const NotifficationContext =
  React.createContext<NotifficationContextType>({
    notiffication: null,
    addNotiffication: () => {},
    removeNotiffication: () => {},
  });

export const NotifficationProvider: FC<NotifficationProviderProps> = ({
  children,
}): JSX.Element => {
  const [notiffication, setNotiffication] = useState<NotificationType | null>(
    null
  );
  const removeNotiffication = async (option: boolean) => {
    if (!option) {
      setNotiffication(null);
    } else {
      await notiffication?.onClose();
      setNotiffication(null);
    }
  };

  const addNotiffication = (notiffication: NotificationType) => {
    setNotiffication(notiffication);
  };

  const contextValue: NotifficationContextType = {
    notiffication,
    addNotiffication: useCallback(
      (notiffication) => addNotiffication(notiffication),
      []
    ),
    removeNotiffication: (option) => removeNotiffication(option),
  };

  return (
    <NotifficationContext.Provider value={contextValue}>
      {children}
    </NotifficationContext.Provider>
  );
};
