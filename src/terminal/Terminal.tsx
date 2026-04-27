import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import "./terminal.css";
import { handleCommand } from "./commands";

export default function TerminalComponent() {
  const terminalRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      theme: {
        background: "#0a0a0a",
        foreground: "#d4d4d4",
      },
    });

    term.open(terminalRef.current);

    let currentLine = "";
    let bootLocked = true;

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    const typeLine = async (text: string) => {
      term.write("\r\n");
      for (const char of text) {
        term.write(char);
        await sleep(15);
      }
    };

    const decodeInlineName = async (prefix: string, finalName: string) => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";

      const iterations = 16;

      for (let i = 0; i < iterations; i++) {
        let outputName = "";

        for (let j = 0; j < finalName.length; j++) {
          if (j < (i / iterations) * finalName.length) {
            outputName += finalName[j];
          } else {
            outputName += chars[Math.floor(Math.random() * chars.length)];
          }
        }

        term.write("\r\x1b[2K");
        term.write(`\x1b[3m${prefix}${outputName}\x1b[0m`);

        await sleep(80);
      }

      term.write("\r\x1b[2K");
      term.writeln(`\x1b[3m${prefix}${finalName}\x1b[0m`);
    };

    const spinnerFrames = ["|", "/", "-", "\\"];

    const bootSequence = async () => {

      term.writeln("")

      await decodeInlineName(
        "Vous entrez dans le terminal privé de ",
        "MARIUS LE DOUARIN"
      );

      await sleep(1000);

      await typeLine(
        "Veuillez taper 'enter' pour continuer...\r\n"
      );
    };

    const runLoadingSequence = async () => {
      term.clear();

      await typeLine(
        "Chargement de la séquence de récupération des données personnelles..."
      );

      await sleep(800);

      term.writeln("");

      await spinLine("\x1b[90m[SYSTEM]\x1b[0m Initialisation des modules");
      await spinLine("\x1b[90m[SYSTEM]\x1b[0m Vérification des identifiants");
      await spinLine("\x1b[90m[SYSTEM]\x1b[0m Déchiffrement des données");
      await spinLine("\x1b[90m[SYSTEM]\x1b[0m Accès sécurisé");

      term.writeln("");
      term.writeln("Séquence terminée. Accès autorisé.");
      term.writeln("");
      term.writeln("Tapez 'help' pour afficher les commandes.");

      bootLocked = false;

      term.write("\r\n> ");
    };

    const spinLine = async (text: string, duration = 900) => {
    for (let i = 0; i < 12; i++) {
      const frame = spinnerFrames[i % spinnerFrames.length];
      term.write(`\r${frame} ${text}`);
      await sleep(duration / 12);
    }

    term.write(`\r✓ ${text}\n`);
  };

    term.onData(async (data: string) => {
      if (bootLocked) {
        if (data === "\r") {
          term.write("\r\n");

          if (currentLine.trim().toLowerCase() === "enter") {
            currentLine = "";
            await runLoadingSequence();
          } else {
            term.writeln("Commande invalide, tapez 'enter' pour continuer...");
            currentLine = "";
          }
        } else if (data === "\u007F") {
          currentLine = currentLine.slice(0, -1);
          term.write("\b \b");
        } else {
          currentLine += data;
          term.write(data);
        }

        return;
      }

      if (data === "\r") {
        term.write("\r\n");

        handleCommand(currentLine.trim(), term);

        currentLine = "";
        term.write("\r\n> ");
      } else if (data === "\u007F") {
        currentLine = currentLine.slice(0, -1);
        term.write("\b \b");
      } else {
        currentLine += data;
        term.write(data);
      }
    });

    bootSequence();

    return () => term.dispose();
  }, []);

  return (
    <div className="terminal-wrapper">
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="dot red" />
          <div className="dot yellow" />
          <div className="dot green" />
        </div>
        <div ref={terminalRef} className="terminal-container" />
      </div>
    </div>
  );
}