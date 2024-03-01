import * as React from 'react';
import { MyCrossword, MyCrosswordProps } from './components';

export type { GuardianCrossword } from './interfaces';
export type { Breakpoint } from './hooks';

export default function App(props: MyCrosswordProps) {
  return (
    <React.StrictMode>
      <MyCrossword {...props} />
    </React.StrictMode>
  );
}
