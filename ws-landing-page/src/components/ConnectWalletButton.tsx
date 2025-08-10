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
  const { aptosConnectWallets } = groupAndSortWallets(wallets);

  const socialWalletName = useMemo(
    () => aptosConnectWallets?.[0]?.name as string | undefined,
    [aptosConnectWallets]
  );

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (connected && account) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ color: "#fff", fontFamily: "monospace" }}>
          {account.address.toString().slice(0, 6)}...
          {account.address.toString().slice(-4)}
        </span>
        <button onClick={handleDisconnect} style={buttonStyle}>Disconnect</button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ background: "transparent", border: "none", padding: 0, cursor: "pointer" }}
        aria-label="Connect Wallet"
      >
        <Image
          src="/assets/Website-page/whitelist/btn_connectwallet.png"
          alt="Connect Wallet"
          width={200}
          height={80}
        />
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
              <style>
                {`
                  .wallet-section {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    width: 100%;
                  }

                  .section-title {
                    font-size: 2rem;
                    font-weight: 700;
                    margin-bottom: 8px;
                    width: 340px;
                    text-align: center;
                    color: black;
                  }

                  .section-subtitle {
                    font-size: 1rem;
                    font-weight: 600;
                    margin: 12px 0 4px 0;
                    width: 340px;
                    text-align: left;
                    color: black;
                  }

                  .wallet-btn {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    gap: 12px;
                    width: 340px;
                    padding: 14px 18px;
                    background: #edd8b4;
                    color: black;
                    border: none;
                    border-radius: 1px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background 0.2s ease, transform 0.1s ease;
                  }

                  .wallet-btn img {
                    width: 22px;
                    height: 22px;
                  }

                  .wallet-btn:hover {
                    background: #e2cfa8;
                  }

                  .wallet-btn:active {
                    transform: scale(0.98);
                  }

                  .wallet-btn:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                  }
                `}
              </style>

              <div className="wallet-section">
                <h3 className="section-title">Connect Wallet</h3>

                <button
                  className="wallet-btn"
                  disabled={isLoading}
                  onClick={() => handleConnect("petra")}
                >
                  <img
                    src="/assets/Website-page/whitelist/Connect Wallet/petra_logo.png"
                    alt="Petra"
                  />
                  Petra
                </button>

                <h4 className="section-subtitle">Social</h4>

                <button
                  className="wallet-btn"
                  disabled={isLoading}
                  onClick={() => handleConnect("google")}
                >
                  <img
                    src="/assets/Website-page/whitelist/Connect Wallet/google_logo.png"
                    alt="Google"
                  />
                  Continue with Google
                </button>

                <button
                  className="wallet-btn"
                  disabled={isLoading}
                  onClick={() => handleConnect("apple")}
                >
                  <img
                    src="/assets/Website-page/whitelist/Connect Wallet/apple_logo.png"
                    alt="Apple"
                  />
                  Continue with Apple
                </button>
              </div>
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
  paddingTop: 80,
  display: "grid",
  gap: 18,
};
