/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPECIFY_PUBLISHER_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
