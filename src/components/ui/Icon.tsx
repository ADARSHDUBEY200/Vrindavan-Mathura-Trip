import { CarFront, Clock, HeartHandshake, TrainFront, type LucideProps } from "lucide-react";
import { GuideIcon, WhatsappIcon } from "@/components/svg/TravelIcons";

/** Maps icon names used in `content/*.ts` to components. */
const icons = {
  guide: GuideIcon,
  car: CarFront,
  clock: Clock,
  train: TrainFront,
  whatsapp: WhatsappIcon,
  heart: HeartHandshake,
} as const;

export type IconName = keyof typeof icons;

export function Icon({ name, size = 24, className }: { name: string; size?: number; className?: string }) {
  const Cmp = (icons as Record<string, React.ComponentType<LucideProps>>)[name] ?? HeartHandshake;
  return <Cmp size={size} className={className} aria-hidden="true" />;
}
