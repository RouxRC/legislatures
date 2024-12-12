import { CurrentType } from "../../types/current";
import { PartyType } from "../../types/party";
import truncateString from "../utils/truncateString";

type EntityType = CurrentType | PartyType | { name: React.ReactNode };

type Props = {
  entity: EntityType;
  onClick: (entity: any) => void;
  isActive: boolean;
  label: string;
};

export default function EntityButton({
  entity,
  onClick,
  isActive,
  label
}: Props) {
  const isParty = (entity: EntityType): entity is PartyType =>
    "full_name" in entity;
  const isCurrent = (entity: EntityType): entity is CurrentType =>
    "color" in entity;

  return (
    <button
      aria-label={label}
      className={`group flex gap-2 items-center max-w-full min-h-full text-black/55 sm:hover:text-black bg-black/5 sm:hover:bg-black/10 transition text-sm sm:text-base text-nowrap py-1 sm:py-0.5
                ${isActive ? "" : "opacity-50"}
                ${isParty(entity) ? "px-1.5 rounded-md" : "px-3 rounded-full"}
                `}
      onClick={() => onClick(entity)}
    >
      {/* Currents have color point */}
      {isCurrent(entity) && (
        <span className="relative flex size-3">
          <span
            className="group-hover:animate-ping absolute inline-flex size-full rounded-full opacity-75"
            style={{ backgroundColor: entity.color }}
          ></span>
          <span
            className="relative inline-flex size-3 rounded-full"
            style={{ backgroundColor: entity.color }}
          ></span>
        </span>
      )}

      <span className="flex items-center min-w-0">
        {isParty(entity) && (
          <span className="text-black/40 sm:text-black/35 group-hover:text-black/50 all-small-caps mr-1 inline-flex h-full text-xs transition text-nowrap">
            {entity.name}
          </span>
        )}

        {/* If party, display full name */}
        <span className="text-nowrap">
          {isParty(entity) ? truncateString(entity.full_name, 30) : entity.name}
        </span>
      </span>
    </button>
  );
}
