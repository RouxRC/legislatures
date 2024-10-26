import { motion } from "framer-motion";
import { PartyType } from "../../types/party";
import { useTransitionsContext } from "../utils/transitionsContext";

type PartyBarProps = {
    party: PartyType;
    y: number;
    height: number;
    minHeight: number;
    partyWidth: number;
    partyX: number;
    coalitionBorder: {
        first: boolean;
        last: boolean;
    },
    transitionDuration: number;
}

export default function PartyBar({ party, y, height, minHeight, partyWidth, partyX, coalitionBorder, transitionDuration }: PartyBarProps) {
    // Display text if the party is wide enough
    const displayText = partyWidth > 30;

    const { transitionsVisibility } = useTransitionsContext();
    const referenceSize = transitionsVisibility ? minHeight : minHeight * 2;

    // Display deputies if the party is tall enough
    const displayDeputies = height > (referenceSize / 2);

    const coalitionStrokeWidth = 0.5;

    return (
        <motion.g
            key={party.name}
            className={`party-bar party-${party.name.toLowerCase().replace(/[^a-z]+/g, '')} current-${party.current?.name.toLowerCase().replace(/[^a-z]+/g, '')}`}
            x={partyX}
            y={y}
            animate={{ x: partyX, y: y }}
            transition={{ duration: transitionDuration }}
        >
            {/* Current rectangle with its current color */}
            <motion.rect
                x={0}
                y={0}
                width={partyWidth}
                height={height}
                fill={party.current.color}
                shapeRendering="crispEdges"
                initial={{ width: partyWidth, height: height }}
                animate={{ width: partyWidth, height: height }}
                transition={{ duration: transitionDuration }}
            />

            {/* Text, if party is wide enough */}
            {displayText &&
                <>
                    {/* Party name */}
                    <text
                        x={4}
                        y={10}
                        textAnchor="left"
                        fill="currentColor"
                        fontSize={10}
                    >
                        {party.name}
                    </text>
        
                    {/* Deputies number, if legislature is long enough */}
                    {displayDeputies &&
                        <text
                            x={4}
                            y={20}
                            textAnchor="left"
                            fill="currentColor"
                            opacity={0.5}
                            fontSize={10}
                        >
                            {party.deputes}
                        </text>
                    }
                </>
            }

            {/* Coalition borders, if the party is in a coalition */}
            {party.coalition &&
                <>
                    {/* Top border */}
                    <motion.line
                        x1={0}
                        y1={0}
                        x2={partyWidth}
                        y2={0}
                        stroke="currentColor"
                        strokeWidth={coalitionStrokeWidth}
                        initial={{ x2: partyWidth }}
                        animate={{ x2: partyWidth }}
                        transition={{ duration: transitionDuration }}
                    />
                    {/* Bottom border */}
                    <motion.line
                        x1={0}
                        y1={height - coalitionStrokeWidth}
                        x2={partyWidth}
                        y2={height - coalitionStrokeWidth}
                        stroke="currentColor"
                        strokeWidth={coalitionStrokeWidth}
                        initial={{ y1: height - coalitionStrokeWidth, x2: partyWidth, y2: height - coalitionStrokeWidth }}
                        animate={{ y1: height - coalitionStrokeWidth, x2: partyWidth, y2: height - coalitionStrokeWidth }}
                        transition={{ duration: transitionDuration }}
                    />
                    {/* Left border, if first of coalition */}
                    {coalitionBorder.first &&
                        <motion.line
                            x1={0}
                            y1={0}
                            x2={0}
                            y2={height - coalitionStrokeWidth}
                            stroke="currentColor"
                            strokeWidth={coalitionStrokeWidth}
                            initial={{ y2: height - coalitionStrokeWidth }}
                            animate={{ y2: height - coalitionStrokeWidth }}
                            transition={{ duration: transitionDuration }}
                        />
                    }
        
                    {/* Right border, if last of coalition */}
                    {coalitionBorder.last &&
                        <motion.line
                            x1={partyWidth - coalitionStrokeWidth}
                            y1={0}
                            x2={partyWidth - coalitionStrokeWidth}
                            y2={height - coalitionStrokeWidth}
                            stroke="currentColor"
                            strokeWidth={coalitionStrokeWidth}
                            initial={{ x1: partyWidth - coalitionStrokeWidth, x2: partyWidth - coalitionStrokeWidth, y2: height - coalitionStrokeWidth }}
                            animate={{ x1: partyWidth - coalitionStrokeWidth, x2: partyWidth - coalitionStrokeWidth, y2: height - coalitionStrokeWidth }}
                            transition={{ duration: transitionDuration }}
                        />
                    }
                </>
            }
        </motion.g>
    )
}