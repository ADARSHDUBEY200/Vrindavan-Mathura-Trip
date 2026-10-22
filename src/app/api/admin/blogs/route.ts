import { createCrudHandlers, revalidators } from "@/lib/cms/route-handler";

export const { POST, PUT, DELETE } = createCrudHandlers("Blog", revalidators.blogs);
