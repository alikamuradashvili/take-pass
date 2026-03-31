import { spawn } from "node:child_process";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const isWindows = process.platform === "win32";

class DevRunner {
  constructor() {
    this.child = null;
    this.isStopping = false;
    this.isRestarting = false;
  }

  start() {
    this.startFrontend();
    this.attachKeyboardShortcuts();
    process.stdout.write("Running Cargo Connect. Press R to restart. Press Q or Ctrl+C to stop.\n");
  }

  startFrontend() {
    const spawnConfig = isWindows
      ? {
          command: "cmd.exe",
          args: ["/d", "/s", "/c", "npm run dev"]
        }
      : {
          command: "sh",
          args: ["-lc", "npm run dev"]
        };

    const child = spawn(spawnConfig.command, spawnConfig.args, {
      cwd: rootDir,
      stdio: "inherit",
      env: process.env
    });

    child.on("exit", (code, signal) => {
      this.child = null;
      if (this.isStopping || this.isRestarting) {
        return;
      }

      const reason = signal ? `signal ${signal}` : `code ${code ?? 0}`;
      process.stderr.write(`frontend exited with ${reason}\n`);
      void this.stop().finally(() => {
        process.exit(code ?? 1);
      });
    });

    child.on("error", (error) => {
      process.stderr.write(`Failed to start frontend: ${error.message}\n`);
      void this.stop().finally(() => {
        process.exit(1);
      });
    });

    this.child = child;
  }

  attachKeyboardShortcuts() {
    if (!process.stdin.isTTY) {
      return;
    }

    process.stdin.setEncoding("utf8");
    process.stdin.setRawMode(true);
    process.stdin.resume();
    process.stdin.on("data", (chunk) => {
      const key = chunk.toLowerCase();
      if (key === "\u0003" || key === "q") {
        void this.stop().finally(() => process.exit(0));
        return;
      }

      if (key === "r") {
        void this.restart();
      }
    });
  }

  async restart() {
    if (this.isRestarting) {
      return;
    }

    this.isRestarting = true;
    process.stdout.write("Restarting Cargo Connect...\n");
    await this.stop({ preserveInput: true });
    this.isRestarting = false;
    this.startFrontend();
  }

  async stop(options = {}) {
    const { preserveInput = false } = options;
    this.isStopping = true;

    if (!preserveInput && process.stdin.isTTY) {
      process.stdin.setRawMode(false);
      process.stdin.pause();
    }

    const child = this.child;
    this.child = null;

    if (child) {
      await new Promise((resolve) => {
        child.once("exit", resolve);
        child.kill("SIGINT");
        setTimeout(() => {
          if (!child.killed) {
            child.kill("SIGTERM");
          }
        }, 1500);
      });
    }

    this.isStopping = false;
  }
}

const runner = new DevRunner();

process.on("SIGINT", () => {
  void runner.stop().finally(() => process.exit(0));
});

process.on("SIGTERM", () => {
  void runner.stop().finally(() => process.exit(0));
});

runner.start();
