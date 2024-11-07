import Dall from "@/public/Tiger-removebg-preview.png";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/home.module.css";

export default function Home() {
	return (
		<div className={styles.container}>
			<header className={styles.header}>
				<div className={styles.logoContainer}>
					<Image src={Dall} alt="Dall" className={styles.logoImage} />
					<div className={styles.logo}>GRUPO FINANÇAS PÉ NO CHÃO</div>
				</div>
				<div className={styles.loginContainer}>
					<Link href="/login" className={styles.loginButton}>
						Login
					</Link>
				</div>
			</header>
			<main className={styles.main}>
				<h1 className={styles.title}>A Verdade Sobre o Jogo do Tigrinho</h1>
				<p className={styles.description}>
					Olá todos! Esse é o site do grupo de extensão Finanças pé no chão da
					UNIMA. A ideia do site é mostrar como esses jogos de investimento,
					como o jogo do tigrinho, funcionam, e como eles são prejudiciais pra
					você. Principalmente, como aquela ou aquele influencer que faz
					videozinho ganhando sempre e com uma soma grande de dinheiro na
					carteira pode estar jogando outro jogo.
				</p>
				<p className={styles.description}>
					Quando você for fazer o login no nosso site vai perceber que existem
					duas contas. A conta winAlways tem um rate de acerto de 100% o que,
					imagine só, é irreal. A conta defaultAcc tem a chance de acerto
					normal, além de ter um contador de quanto dinheiro você já perdeu.
				</p>
				<p className={styles.description}>
					Esperamos que esse projeto sirva para as pessoas repensarem que esse
					dinheiro fácil nunca é fácil. Pense bem, se fosse tão fácil assim, o
					dono do site o teria, pois estaria perdendo dinheiro.
				</p>
			</main>
		</div>
	);
}
