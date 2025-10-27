/* eslint-disable @typescript-eslint/no-explicit-any */

import chalk from 'chalk';

let verbose = false;

export const logger = {
  warn: (msg: any) => console.warn(chalk.bgYellow.ansi256(15)(' WARN '), msg),
  error: (msg: any) => console.error(chalk.bgRed.ansi256(15)(' ERRR '), msg),
  notice: (msg: any) => console.log(chalk.bgYellowBright.black(' NOTE '), msg),
  info: (msg: any) => console.log(chalk.bgGreen.ansi256(15)(' INFO '), msg),
  verbose: (msg: any) =>
    verbose && console.log(chalk.bgGreen.ansi256(15)(' DBG! '), msg),
  debug: (msg: any) =>
    verbose && console.log(chalk.bgGreen.ansi256(15)(' DBG! '), msg),
  measure: (start: [number, number], milestone: string) => {
    if (!verbose) return;

    const [totalSeconds, nanoseconds] = process.hrtime(start);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = nanoseconds / 1000000;

    const msFormatted = milliseconds.toFixed(3);
    const timeStr = `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}:${msFormatted.padStart(7, '0')}ms`;

    console.log(
      chalk.bgGreen.ansi256(15)(' DBG! '),
      `${timeStr} - ${milestone}`
    );
  },
};

export const setLogLevel = (level: string) => {
  verbose = level === 'verbose';
};
