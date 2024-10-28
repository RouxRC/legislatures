type PercentageButtonProps = { 
    percentage: number; 
    deputies: number; 
    totalDeputies: number;
    isPercentage: boolean;
    onHover: () => void;
};

export default function PercentageButton({ percentage, deputies, totalDeputies, isPercentage, onHover }: PercentageButtonProps) {
    // If the percentage is 100, display "Plein pouvoirs"
    const isFullPowers = percentage === 100;
    return (
        <div 
            className="flex items-center py-1 sm:py-0.5 px-1.5 rounded-full bg-black/5 text-xs cursor-default"
            onMouseEnter={onHover}
            onMouseLeave={onHover}
        >
            <span className="text-black/65 text-nowrap">
                {isFullPowers
                    ? "Plein pouvoirs"
                    : isPercentage
                        ? percentage.toFixed(1)
                        : deputies
                }
            </span>
            {!isFullPowers && 
                <span className="text-black/45">
                    {isPercentage
                        ? "\u202F%"
                        : "/" + totalDeputies
                    }
                </span>
            }
        </div>
    )
}
