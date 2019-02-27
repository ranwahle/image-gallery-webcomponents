import { Config } from '@stencil/core';
import { sass} from '@stencil/sass';

export const config: Config = {
  namespace: 'components-gallery',
  plugins: [sass()],
  outputTargets:[
    { type: 'dist' },
    { type: 'docs' },
     ]
};
