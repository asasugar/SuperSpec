import chalk from 'chalk';

export const theme = {
  primary: chalk.hex('#6366f1'),
  success: chalk.hex('#22c55e'),
  warning: chalk.hex('#f59e0b'),
  error: chalk.hex('#ef4444'),
  info: chalk.hex('#3b82f6'),
  boost: chalk.hex('#a855f7'),
  dim: chalk.hex('#6b7280'),
  highlight: chalk.hex('#f472b6'),
  border: chalk.hex('#374151'),
  gradient1: chalk.hex('#818cf8'),
  gradient2: chalk.hex('#6366f1'),
  gradient3: chalk.hex('#4f46e5'),
};

// ASCII Art Logo for SuperSpec (S-U-P-E-R-S-P-E-C)
export const logo = {
  small: `
${theme.gradient1('   ███████╗██╗   ██╗██████╗ ███████╗██████╗ ███████╗██████╗ ███████╗ ██████╗')}
${theme.gradient2('   ██╔════╝██║   ██║██╔══██╗██╔════╝██╔══██╗██╔════╝██╔══██╗██╔════╝██╔════╝')}
${theme.gradient3('   ███████╗██║   ██║██████╔╝█████╗  ██████╔╝███████╗██████╔╝█████╗  ██║     ')}
${theme.gradient2('   ╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗╚════██║██╔═══╝ ██╔══╝  ██║     ')}
${theme.gradient1('   ███████║╚██████╔╝██║     ███████╗██║  ██║███████║██║     ███████╗╚██████╗')}
${theme.gradient1('   ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝ ╚═════╝')}
  `,
  tiny: `
${theme.gradient1('   ███████╗██╗   ██╗██████╗ ███████╗██████╗ ███████╗██████╗ ███████╗ ██████╗')}
${theme.gradient2('   ╚═════╗██║   ██║██╔══██║██╔════╝██╔══██╗╚═════╗██╔══██║██╔════╝██╔════╝')}
${theme.gradient3('   ███████║██║   ██║██████╔╝█████╗  ██████╔╝███████║██████╔╝█████╗  ██║     ')}  ${theme.highlight('Spec-Driven Development')}
${theme.gradient2('   ╚════██║██║   ██║██╔═══╝ ██╔══╝  ██╔══██╗╚════██║██╔═══╝ ██╔══╝  ██║     ')}
${theme.gradient1('   ███████║╚██████╔╝██║     ███████╗██║  ██║███████║██║     ███████╗╚██████╗')}
${theme.gradient1('   ╚══════╝ ╚═════╝ ╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝     ╚══════╝ ╚═════╝')}
  `,
};

const box = {
  topLeft: '╭',
  topRight: '╮',
  bottomLeft: '╰',
  bottomRight: '╯',
  horizontal: '─',
  vertical: '│',
};

function boxText(text: string, width: number = 50): string {
  const padding = ' '.repeat(Math.max(0, width - text.length - 4));
  return `${theme.border(box.vertical)} ${theme.highlight(text)}${padding} ${theme.border(box.vertical)}`;
}

function createBox(lines: string[], width: number = 52): string {
  const top = theme.border(`${box.topLeft}${box.horizontal.repeat(width - 2)}${box.topRight}`);
  const bottom = theme.border(`${box.bottomLeft}${box.horizontal.repeat(width - 2)}${box.bottomRight}`);
  const middle = lines.map(line => boxText(line, width));
  return [top, ...middle, bottom].join('\n');
}

export const log = {
  info: (msg: string) => console.log(theme.info(msg)),
  success: (msg: string) => console.log(theme.success(msg)),
  warn: (msg: string) => console.log(theme.warning(msg)),
  error: (msg: string) => console.log(theme.error(msg)),
  dim: (msg: string) => console.log(theme.dim(msg)),
  boost: (msg: string) => console.log(theme.boost(msg)),
  highlight: (msg: string) => console.log(theme.highlight(msg)),
  title: (msg: string) => {
    console.log();
    console.log(createBox([msg]));
    console.log();
  },
  section: (msg: string) => {
    console.log();
    console.log(theme.primary(`◆ ${msg}`));
    console.log(theme.border('─'.repeat(50)));
  },
  done: (msg: string) => {
    console.log();
    console.log(theme.success(`✨ ${msg}`));
    console.log();
  },
};

export const symbol = {
  start: theme.primary('◆'),
  ok: theme.success('✓'),
  fail: theme.error('✗'),
  warn: theme.warning('⚠'),
  bolt: theme.boost('⚡'),
  arrow: theme.dim('→'),
  bullet: theme.dim('•'),
  sparkle: theme.highlight('✨'),
  folder: theme.primary('📁'),
  file: theme.info('📄'),
  git: theme.warning('🌿'),
  ai: theme.boost('🤖'),
  info: theme.info('ℹ'),
} as const;

// Helper to print the logo
export function printLogo(size: 'small' | 'tiny' = 'small'): void {
  console.log(logo[size]);
}

let _lang: 'zh' | 'en' = 'en';

export function setLang(lang: 'zh' | 'en'): void {
  _lang = lang;
}

export function t(en: string, zh: string): string {
  return _lang === 'zh' ? zh : en;
}

// Helper to print a summary box
export function printSummary(items: { label: string; value: string }[]): void {
  const maxLabel = Math.max(...items.map(i => i.label.length));
  const width = 50;

  console.log(theme.border('╭' + '─'.repeat(width - 2) + '╮'));
  for (const { label, value } of items) {
    const padding = ' '.repeat(maxLabel - label.length);
    const line = `${theme.dim(label)}${padding} ${symbol.arrow} ${theme.highlight(value)}`;
    // Strip ANSI codes for length calculation
    const plainLine = line.replace(/\u001b\[\d+(?:;\d+)*m/g, '');
    const rightPad = ' '.repeat(Math.max(0, width - plainLine.length - 4));
    console.log(theme.border('│ ') + line + rightPad + theme.border(' │'));
  }
  console.log(theme.border('╰' + '─'.repeat(width - 2) + '╯'));
}
