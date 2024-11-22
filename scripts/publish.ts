import { execSync } from "child_process";
const term = require("terminal-kit").terminal;

console.log("Building root file...");

execSync("npm run build", { stdio: "inherit" }); // Run the build command

// Predefined list of package directories
const packageDirectories = [
  "packages/package1",
  "packages/package2",
  "packages/package3",
];

async function runCommandWithProgress(title: string, command: string, cwd: string) {
  return new Promise<void>((resolve, reject) => {
    let progress = 0;

    const progressBar = term.progressBar({
      width: 80,
      title: `${title}:`,
      eta: true,
      percent: true,
    });

    const interval = setInterval(() => {
      progress += 0.05; // Simulating progress in steps
      progressBar.update(progress);

      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 100);

    try {
      execSync(command, { cwd, stdio: "inherit" }); // Execute the command
      progress = 1; // Ensure progress reaches 100% when the command completes
      progressBar.update(progress);
      clearInterval(interval);
      setTimeout(() => resolve(), 200); // Slight delay to let the progress bar complete animation
    } catch (error) {
      clearInterval(interval);
      term.red(`\nFailed to execute command for ${title}: ${error}\n`);
      reject(error);
    }
  });
}

(async () => {
  for (const dir of packageDirectories) {
    console.log(`Publishing package: ${dir}...`);
    try {
      await runCommandWithProgress(`Publishing ${dir}`, "npm publish", dir);
    } catch (error) {
      console.error(`Failed to publish package ${dir}:`, error);
    }
  }

  term("\nBuild and publish complete.\n");
})();
