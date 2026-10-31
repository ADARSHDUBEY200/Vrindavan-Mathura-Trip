import { createCrudHandlers, revalidators } from "@/lib/cms/route-handler";
import { validateTempleRow } from "@/lib/cms/temple-fields";

export const { POST, PUT, DELETE } = createCrudHandlers("Temple", revalidators.temples, validateTempleRow);
