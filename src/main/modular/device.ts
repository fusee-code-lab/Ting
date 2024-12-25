import { app } from 'electron';
import { join } from 'node:path';


export const appDefPath = join(app.getPath('music'), process.env.SAVE_FILE!);