"use client";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useWallet, groupAndSortWallets } from "@aptos-labs/wallet-adapter-react";

const BASE = "/assets/Website-page/whitelist/Connect Wallet";
const path = (file: string) => encodeURI(`${BASE}/${file}`);
const ASSETS = {
  bg: path("wallet-selector-modal-bg-nt.png"),
  close: path("close-btn.png"),
  google: path("google (1).png"),
  apple: path("apple.png"),
  petra: path("petra.png"),
};

export default function ConnectWalletButton() {
  const { connect, disconnect, account, connected, wallets = [], isLoading } = useWallet();
  const [open, setOpen] = useState(false);
  // Get full grouped lists (OLD logic brought in)
  const { aptosConnectWallets, availableWallets = [], installableWallets = [] } = groupAndSortWallets(wallets);

  // Social adapter name (Aptos Connect). Both Google/Apple buttons use this single adapter.
  const socialWalletName = useMemo(
    () => aptosConnectWallets?.[0]?.name as string | undefined,
    [aptosConnectWallets]
  );
  // Petra detection (do NOT rely on url presence)
  const {
    petraInstalled,
    petraWalletName,
    petraInstallUrl,
  } = useMemo(() => {
    const lower = (s: string) => s.toLowerCase();
    const petraAvailable: any = availableWallets.find((w: any) => lower(w.name).includes("petra"));
    const petraInstallable: any = petraAvailable
      ? undefined
      : installableWallets.find((w: any) => lower(w.name).includes("petra"));
    return {
      petraInstalled: !!petraAvailable,
      petraWalletName: petraAvailable ? petraAvailable.name as string : undefined,
      petraInstallUrl: petraInstallable?.url as string | undefined,
    };
  }, [availableWallets, installableWallets]);

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
              .wallet-section { display:flex; flex-direction:column; align-items:center; gap:16px; width:100%; }
              .section-title { font-size:2rem; font-weight:700; margin-bottom:8px; width:340px; text-align:center; color:#000; }
              .section-subtitle { font-size:1rem; font-weight:600; margin:12px 0 4px; width:340px; text-align:left; color:#000; }
              .wallet-btn { display:flex; align-items:center; justify-content:flex-start; gap:12px; width:340px; padding:14px 18px; background:#edd8b4; color:#000; border:none; border-radius:5px; font-size:1rem; font-weight:600; cursor:pointer; transition:background .2s ease, transform .1s ease; }
              .wallet-btn.shadow { box-shadow:0 4px 6px rgba(0,0,0,.3); }
              .wallet-btn img { width:22px; height:22px; }
              .wallet-btn:hover { background:#e2cfa8; }
              .wallet-btn:active { transform:scale(.98); }
              .wallet-btn:disabled { opacity:.55; cursor:not-allowed; }
              .muted { opacity:.7; font-size:.85rem; }
              .install-tag { margin-left:auto; font-size:.75rem; font-weight:600; background:rgba(0,0,0,.15); padding:3px 8px; border-radius:12px; }
              .divider { width:340px; height:1px; background:rgba(0,0,0,.15); margin:4px 0; }
            `}
            </style>

              <div className="wallet-section">
                <h3 className="section-title">Connect Wallet</h3>

                {/* Petra primary action (installed) */}
                {petraWalletName && (
                  <button
                    className="wallet-btn shadow"
                    disabled={isLoading}
                    onClick={() => handleConnect(petraWalletName)}
                  >
                    <img src="/assets/Website-page/whitelist/Connect Wallet/petra_logo.png" alt="Petra" />
                    {petraWalletName}
                  </button>
                )}

                {/* Petra install CTA if not installed */}
                {!petraWalletName && petraInstallUrl && (
                  <button
                    className="wallet-btn shadow"
                    onClick={() => window.open(petraInstallUrl, "_blank")}
                  >
                    <img src="/assets/Website-page/whitelist/Connect Wallet/petra_logo.png" alt="Petra" />
                    Install Petra <span className="install-tag">Install</span>
                  </button>
                )}

                {/* Social (Aptos Connect) */}
                {socialWalletName && (
                  <>
                    <h4 className="section-subtitle">Social</h4>
                    <button
                      className="wallet-btn shadow"
                      disabled={isLoading}
                      onClick={() => handleConnect(socialWalletName)}
                    >
                      <img src="/assets/Website-page/whitelist/Connect Wallet/google_logo.png" alt="Google" />
                      Continue with Google
                    </button>
                    <button
                      className="wallet-btn shadow"
                      disabled={isLoading}
                      onClick={() => handleConnect(socialWalletName)}
                    >
                      <img src="/assets/Website-page/whitelist/Connect Wallet/apple_logo.png" alt="Apple" />
                      Continue with Apple
                    </button>
                  </>
                )}

                {/* Other installed wallets (excluding Petra) */}
                {availableWallets.filter((w: any) => !String(w.name).toLowerCase().includes("petra")).length > 0 && (
                  <>
                    <div className="divider" />
                    <h4 className="section-subtitle">Installed Wallets</h4>
                    {availableWallets
                      .filter((w: any) => !String(w.name).toLowerCase().includes("petra"))
                      .map((w: any) => (
                        <button
                          key={w.name}
                          className="wallet-btn"
                          disabled={isLoading}
                          onClick={() => handleConnect(w.name)}
                        >
                          {/* Use wallet provided icon if available */}
                          {w.icon && <img src={w.icon} alt={w.name} />}
                          {w.name}
                        </button>
                      ))}
                  </>
                )}

                {/* Installable wallets */}
                {installableWallets.length > 0 && (
                  <>
                    <div className="divider" />
                    <h4 className="section-subtitle">More Wallets</h4>
                    {installableWallets.map((w: any) => {
                      const isPetra = String(w.name).toLowerCase().includes("petra");
                      const icon = isPetra ? ASSETS.petra : w.icon;
                      return (
                        <button
                          key={w.name}
                          className="wallet-btn"
                          onClick={() => window.open(w.url, "_blank")}
                        >
                          {icon && <img src={icon} alt={w.name} />}
                          {w.name}
                          <span className="install-tag">Install</span>
                        </button>
                      );
                    })}
                  </>
                )}

                {/* Loading indicator */}
                {isLoading && <div className="muted">Connecting...</div>}
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
  aspectRatio: "790 / 650",
  borderRadius: 16,
  // border: "1px solid rgba(255,255,255,0.08)",
  overflow: "hidden",
  // boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
  backgroundColor: "transparent",
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
