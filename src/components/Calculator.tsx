import { useCallback, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import CopyButton from "./CopyButton";

const NUM_REG = /-?\d+(\.\d+)?/g;

interface CalculatorProps {
    value: string;
}

const Calculator: React.FC<CalculatorProps> = ({ value }) => {
    const [text, setText] = useState(value || "");
    const [result, setResult] = useState({
        sum: 0,
        mult: 0,
    });

    console.log("TEX", value, text);

    const calculateResult = useDebouncedCallback((text: string) => {
        const numbers = text.match(NUM_REG);
        setResult({
            sum: numbers?.reduce((acc, curr) => acc + parseFloat(curr), 0) || 0,
            mult: numbers?.reduce((acc, curr) => acc * parseFloat(curr), 1) || 0,
        });
    }, 100);

    const handleExpressionChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const newExpression = e.target.value;
            setText(newExpression);
            calculateResult(newExpression);
        },
        [calculateResult],
    );

    return (
        <div className="calculator">
            <textarea value={text} onChange={handleExpressionChange} rows={4} className="calculator-input" />

            <div className="calculator-result">
                <CopyButton label={"= " + result.sum} value={"" + result.sum} />
            </div>
        </div>
    );
};

export default Calculator;
