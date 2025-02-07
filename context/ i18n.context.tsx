import { createContext } from "react";

const i18nContext = createContext({
  locale: "en",
  setLocale: (locale: string) => {},
});
const i18nProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <i18nContext.Provider
      value={{ locale: "en", setLocale: () => {} }}
    ></i18nContext.Provider>
  );
};

export default i18nProvider;
