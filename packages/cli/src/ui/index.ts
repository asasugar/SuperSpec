import chalk from 'chalk';

export const log = {
  info: (msg: string) => console.log(chalk.blue(msg)),
  success: (msg: string) => console.log(chalk.green(msg)),
  warn: (msg: string) => console.log(chalk.yellow(msg)),
  error: (msg: string) => console.log(chalk.red(msg)),
  dim: (msg: string) => console.log(chalk.dim(msg)),
  boost: (msg: string) => console.log(chalk.magenta(msg)),
};

export const symbol = {
  start: '◆',
  ok: '✓',
  fail: '✗',
  warn: '⚠',
  bolt: '⚡',
} as const;
