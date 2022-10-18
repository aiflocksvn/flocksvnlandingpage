import { useRouter } from "next/router";

import en from "../locales/en.json";
import vi from "../locales/vi.json";

const useTranslation = () => {
    const router = useRouter();
    const locale = router.locale;
    const t = locale === "en-US" ? en : vi;

    return t;
}

export default useTranslation;