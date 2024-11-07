import styles from "@/styles/game.module.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// Define os símbolos possíveis para os slots
const symbols = ["🍒", "🍋", "🍉", "🍇", "🔔", "⭐", "🍀"] as const;

// Tabela de pagamento baseada em combinações vencedoras para 3, 4, 5 e 6 símbolos iguais
const payoutTable: { [key: string]: number } = {
	"3": 1, // 3 matching symbols
	"4": 50, // 4 matching symbols
	"5": 100, // 5 matching symbols
	"6": 200, // 6 matching symbols
};

export default function Game() {
	const router = useRouter();
	const { userid } = router.query;

	const [balance, setBalance] = useState<number>(0);
	const [result, setResult] = useState<string>("");
	const [reels, setReels] = useState<string[]>(["", "", "", "", ""]); // 5 slots
	const [highlighted, setHighlighted] = useState<number[]>([]);
	const [isSpinning, setIsSpinning] = useState<boolean>(false);
	const [totalLost, setTotalLost] = useState<number>(0); // Track total money lost

	useEffect(() => {
		if (userid === "0") {
			setBalance(1000000); // Inicia com muito dinheiro para o userid 0
		} else {
			setBalance(2); // Inicia com R$2 para outros usuários
		}
	}, [userid]);

	const spinReels = () => {
		setIsSpinning(true);
		setHighlighted([]);
		const spinningDuration = 3000; // Duração de rotação de 3 segundos

		// Simula a rotação dos cilindros com símbolos randomizados a cada 100ms durante a duração da rotação
		const spinInterval = setInterval(() => {
			setReels(
				reels.map(() => symbols[Math.floor(Math.random() * symbols.length)])
			);
		}, 100);

		// Para a rotação e determina vitória/derrota após a duração da rotação
		setTimeout(() => {
			clearInterval(spinInterval);
			setIsSpinning(false);

			let finalReels;
			if (userid === "0") {
				const winningSymbol =
					symbols[Math.floor(Math.random() * symbols.length)];

				finalReels = Array(5)
					.fill(null)
					.map((_, i) => {
						return i < 3 || Math.random() < 0.5
							? winningSymbol
							: symbols[Math.floor(Math.random() * symbols.length)];
					});
			} else {
				finalReels = reels.map(
					() => symbols[Math.floor(Math.random() * symbols.length)]
				);
			}

			setReels(finalReels);
			checkWin(finalReels);
		}, spinningDuration);
	};

	const checkWin = (finalReels: string[]) => {
		const symbolCount: { [key: string]: number } = {};
		finalReels.forEach((symbol) => {
			symbolCount[symbol] = (symbolCount[symbol] || 0) + 1;
		});

		let winAmount = 0;
		let maxMatches = 0;
		for (const count of Object.values(symbolCount)) {
			if (count >= 3 && count > maxMatches) {
				maxMatches = count;
				winAmount = payoutTable[maxMatches.toString()] || 0;
			}
		}

		if (maxMatches >= 3) {
			const winningSymbol = Object.keys(symbolCount).find(
				(symbol) => symbolCount[symbol] === maxMatches
			);
			const winningIndices = finalReels
				.map((symbol, index) => (symbol === winningSymbol ? index : -1))
				.filter((index) => index !== -1);
			setHighlighted(winningIndices);
		}

		if (winAmount > 0) {
			setBalance(balance + winAmount);
			setResult(`Parabéns! Você ganhou R$${winAmount} créditos!`);
		} else {
			setBalance(balance - 1);
			setTotalLost(totalLost + 1);
			setResult("Desculpe, você perdeu. Tente novamente!");
		}
	};

	const addMoreMoney = () => {
		const amount = userid === "0" ? 1000 : 10;
		if (userid === "1") {
			setTotalLost(totalLost + 10);
		}
		setBalance(balance + amount);
		setResult(`Você adicionou R$${amount} ao saldo!`);
	};

	const handlePlay = () => {
		if (isSpinning) return;
		spinReels();
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Jogo do Tigrinho</h1>
			<p className={styles.balance}>Saldo: R${balance}</p>

			<div className={styles.slotContainer}>
				<div className={styles.slotMachine}>
					{reels.map((symbol, index) => (
						<div
							key={index}
							className={`${styles.reel} ${
								highlighted.includes(index) ? styles.highlighted : ""
							}`}
						>
							{symbol}
						</div>
					))}
				</div>
				<button
					onClick={handlePlay}
					className={`${styles.playButton}`}
					disabled={isSpinning}
				>
					Jogar
				</button>
			</div>

			<button onClick={addMoreMoney} className={styles.addMoneyButton}>
				Adicionar Mais Dinheiro
			</button>

			{result && <p className={styles.result}>{result}</p>}

			{userid === "1" && (
				<div className={styles.lossBoard}>
					<h2>Quão pobre está sua família</h2>
					<p>Total de dinheiro perdido: R${totalLost}</p>
				</div>
			)}
		</div>
	);
}
