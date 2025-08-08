"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useWallet, groupAndSortWallets } from "@aptos-labs/wallet-adapter-react";

const BASE = "/assets/Website-page/whitelist/Connect Wallet";
const path = (file: string) => encodeURI(`${BASE}/${file}`);
const ASSETS = {
	bg: path("wallet-selector-modal-bg.png"),
	close: path("close-btn.png"),
	google: path("google (1).png"),
	apple: path("apple.png"),
	petra: path("petra.png"),
};

export default function ConnectWalletButton() {
	const { connect, disconnect, account, connected, wallets = [], isLoading } = useWallet();
	const [open, setOpen] = useState(false);
	const { aptosConnectWallets, availableWallets, installableWallets } = groupAndSortWallets(wallets);

	const socialWalletName = useMemo(() => aptosConnectWallets?.[0]?.name as string | undefined, [aptosConnectWallets]);

	const handleConnect = async (walletName: string) => {
		try {
			await connect(walletName);
			setOpen(false);
		} catch (e) {
			console.error("Failed to connect:", e);
		}
	};

	const handleDisconnect = async () => {
		try {
			await disconnect();
		} catch (e) {
			console.error("Failed to disconnect:", e);
		}
	};

	// Close on Escape
	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open]);

		if (connected && account) {
			return (
				<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
					<span style={{ color: "#fff", fontFamily: "monospace" }}>
						{account.address.toString().slice(0, 6)}...{account.address.toString().slice(-4)}
					</span>
					<button onClick={handleDisconnect} style={buttonStyle}>Disconnect</button>
				</div>
			);
		}

	return (
		<>
			<button onClick={() => setOpen(true)} style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }} aria-label="Connect Wallet">
				<Image src="/assets/Website-page/whitelist/btn_connectwallet.png" alt="Connect Wallet" width={200} height={80} />
			</button>

			{open && (
				<div style={backdropStyle} onClick={() => setOpen(false)}>
					<div style={modalShellStyle} onClick={(e) => e.stopPropagation()}>
						<div style={modalHeaderStyle}>
							<div style={{ flex: 1 }} />
							<button style={iconBtnStyle} onClick={() => setOpen(false)} aria-label="Close">
								<Image src={ASSETS.close} alt="Close" width={28} height={28} />
							</button>
						</div>

						<div style={modalBodyStyle}>
							<h3 style={titleStyle}>CONNECT WALLET</h3>

							{/* Installed - Petra first */}
							{(() => {
								const petra = availableWallets.find((w: any) => String(w.name).toLowerCase().includes("petra"));
								if (!petra) return null;
								return (
									<div style={{ display: "grid", gap: 8 }}>
										<button key={petra.name} style={walletCardStyle} disabled={isLoading} onClick={() => handleConnect(petra.name)}>
											<Image src={ASSETS.petra} alt={petra.name} width={28} height={28} />
											<span style={walletNameStyle}>{petra.name}</span>
										</button>
									</div>
								);
							})()}

							{socialWalletName && (
								<div style={{ display: "grid", gap: 12 }}>
									<h4 style={sectionTitleStyle}>Socials</h4>
									<div style={socialRowStyle}>
										<button
											disabled={isLoading}
											onClick={() => handleConnect(socialWalletName)}
											style={imageButtonStyle}
										>
											<Image src={ASSETS.google} alt="Sign in with Google" width={260} height={56} />
										</button>
										<button
											disabled={isLoading}
											onClick={() => handleConnect(socialWalletName)}
											style={imageButtonStyle}
										>
											<Image src={ASSETS.apple} alt="Sign in with Apple" width={260} height={56} />
										</button>
									</div>
								</div>
							)}

							{availableWallets.length > 0 && (
								<div style={{ display: "grid", gap: 12 }}>
									{/* Render other installed wallets below if any besides Petra */}
									<div style={walletGridStyle}>
										{availableWallets.filter((w: any) => !String(w.name).toLowerCase().includes("petra")).map((w: any) => (
											<button key={w.name} style={walletCardStyle} disabled={isLoading} onClick={() => handleConnect(w.name)}>
												<Image src={w.icon} alt={w.name} width={28} height={28} />
												<span style={walletNameStyle}>{w.name}</span>
											</button>
										))}
									</div>
								</div>
							)}

							{installableWallets.length > 0 && (
								<div style={{ display: "grid", gap: 12 }}>
									<h4 style={sectionTitleStyle}>More Wallets</h4>
									<div style={walletGridStyle}>
										{installableWallets.map((w: any) => {
											const isPetra = String(w.name).toLowerCase().includes("petra");
											const icon = isPetra ? ASSETS.petra : w.icon;
											return (
												<button key={w.name} style={{ ...walletCardStyle, opacity: 0.95 }} onClick={() => window.open(w.url, "_blank")}>
													<Image src={icon} alt={w.name} width={28} height={28} />
													<span style={walletNameStyle}>{w.name}</span>
													<span style={installTagStyle}>Install</span>
												</button>
											);
										})}
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}

const buttonStyle: React.CSSProperties = {
	background: "#222",
	color: "#fff",
	border: "1px solid #444",
	borderRadius: 6,
	padding: "6px 10px",
	cursor: "pointer",
};

const backdropStyle: React.CSSProperties = {
	position: "fixed",
	inset: 0,
	background: "rgba(0,0,0,0.6)",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	zIndex: 1000,
};

const modalStyle: React.CSSProperties = {
	width: "min(92vw, 520px)",
	background: "#0f0f12",
	color: "#fff",
	border: "1px solid #2a2a2a",
	borderRadius: 10,
	padding: 16,
	boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
};

const walletGridStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
	gap: 8,
};

const walletBtnStyle: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: 8,
	padding: "10px 12px",
	borderRadius: 8,
	background: "#1a1a1e",
	border: "1px solid #2a2a2a",
	color: "#fff",
	cursor: "pointer",
};

// New styles for custom modal UI
const modalShellStyle: React.CSSProperties = {
	position: "relative",
	width: "min(94vw, 720px)",
	minHeight: 650,
	borderRadius: 16,
	border: "1px solid rgba(255,255,255,0.08)",
	overflow: "hidden",
	boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
	backgroundColor: "#0f0f12",
	backgroundImage: `url("${ASSETS.bg}")`,
	backgroundSize: "cover",
	backgroundRepeat: "no-repeat",
	backgroundPosition: "center",
};

const modalHeaderStyle: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: "12px 12px 0 12px",
};

const iconBtnStyle: React.CSSProperties = {
	background: "transparent",
	border: "none",
	padding: 0,
	cursor: "pointer",
};

const modalBodyStyle: React.CSSProperties = {
	padding: "20px 20px 24px 20px",
	paddingTop: 80, // push content (e.g., Petra button) further down on the parchment
	display: "grid",
	gap: 18,
};

const titleStyle: React.CSSProperties = {
	margin: 0,
	textAlign: "center",
	color: "#fff",
	fontSize: 18,
	fontWeight: 800,
	letterSpacing: 0.4,
};

const sectionTitleStyle: React.CSSProperties = {
	margin: 0,
	color: "#fff",
	fontSize: 16,
	fontWeight: 600,
	letterSpacing: 0.3,
};

const socialRowStyle: React.CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
	gap: 12,
};

const imageButtonStyle: React.CSSProperties = {
	background: "transparent",
	border: "none",
	padding: 0,
	cursor: "pointer",
	display: "inline-flex",
	alignItems: "center",
	justifyContent: "center",
};

const walletCardStyle: React.CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: 10,
	padding: "12px 14px",
	borderRadius: 8,
	background: "#e7d4b4", // parchment-like beige
	border: "1px solid rgba(0,0,0,0.1)",
	color: "#1a1a1a",
	cursor: "pointer",
};

const walletNameStyle: React.CSSProperties = {
	fontSize: 14,
	fontWeight: 600,
};

const installTagStyle: React.CSSProperties = {
	marginLeft: "auto",
	fontSize: 12,
	opacity: 0.8,
};

